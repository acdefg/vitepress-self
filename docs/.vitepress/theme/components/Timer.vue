<template>
  <div class="timer-container" :style="containerStyle">
    <div class="timer-display">
      <!-- 显示正计时或倒计时 -->
      {{ isForwardTiming ? formatForwardTime : formattedTime }}
    </div>

    <div class="mode-selector">
      <button v-for="mode in modes" :key="mode.value" @click="switchMode(mode.value)"
        :class="['mode-btn', { active: currentMode === mode.value }]">
        {{ mode.label }}
      </button>
    </div>

    <div class="controls">
      <button @click="toggleTimer" class="start-btn">
        {{ isRunning ? '暂停' : '开始' }}
      </button>
      <button @click="resetTimer" class="reset-btn">
        {{ isForwardTiming ? '停止' : '重置' }}
      </button>
    </div>

    <!-- 更新提示弹窗 -->
    <div v-if="showContinuePrompt" class="continue-prompt">
      <p>{{ currentMode === 'pomodoro' ? '专注' : '休息' }}时间结束！</p>
      <p>累计时间：{{ Math.floor(accumulatedTime / 60) }}分钟</p>
      <div class="prompt-buttons">
        <button @click="handleStop" class="stop-btn">停止</button>
        <button @click="handleContinue" class="continue-btn">继续</button>
        <template v-if="currentMode === 'pomodoro'">
          <button @click="() => handleNext('shortBreak')" class="break-btn">短休息</button>
          <button @click="() => handleNext('longBreak')" class="break-btn">长休息</button>
        </template>
        <button v-else @click="handleNext('pomodoro')" class="next-btn">开始专注</button>
      </div>
    </div>
  </div>
</template>

/*TODO:
- 增加可删除记录选项
- 连续计时后改为正向计时
- 增加不同分类
- 详细数据表格修改
- 计时完成系统提示（请求系统权限）
*/

<script>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

export default {
  props: {
    customTimes: {
      type: Object,
      default: () => ({
        pomodoro: 25 * 60,
        shortBreak: 5 * 60,
        longBreak: 15 * 60
      })
    },
    currentUser: {
      type: Object,
      default: null
    }
  },

  emits: ['update-stats'],

  setup(props, { emit }) {
    const modes = computed(() => [
      { value: 'pomodoro', label: '专注', duration: props.customTimes.pomodoro, color: '#c45353' },
      { value: 'shortBreak', label: '短休', duration: props.customTimes.shortBreak, color: '#38858a' },
      { value: 'longBreak', label: '长休', duration: props.customTimes.longBreak, color: '#397097' }
    ])

    const currentMode = ref('pomodoro')
    const timeLeft = ref(modes.value[0].duration)
    const isRunning = ref(false)
    const timerId = ref(null)

    const elapsedTime = ref(0)
    const targetTime = ref(0)
    const showContinuePrompt = ref(false)
    const continuePromptTimer = ref(null)
    const startTime = ref(null)
    const accumulatedTime = ref(0)  // Add this ref for tracking accumulated time
    const lastMode = ref(null)      // Add this ref for tracking mode changes
    const audioContext = ref(null)

    // Add new refs for session tracking
    const sessionComplete = ref(false)
    const lastSessionSaved = ref(true)

    // 添加新的 refs
    const isForwardTiming = ref(false)
    const MIN_POMODORO_TIME = 300 // 5分钟
    const MIN_BREAK_TIME = 10 // 10秒

    const formattedTime = computed(() => {
      const mins = Math.floor(timeLeft.value / 60)
      const secs = timeLeft.value % 60
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    })

    // 修改正向计时格式化计算
    const formatForwardTime = computed(() => {
      const totalSeconds = elapsedTime.value
      const mins = Math.floor(totalSeconds / 60)
      const secs = totalSeconds % 60
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    })

    const containerStyle = computed(() => ({
      backgroundColor: modes.value.find(m => m.value === currentMode.value)?.color
    }))

    const requestNotificationPermission = async () => {
      if (Notification.permission !== 'granted') {
        await Notification.requestPermission()
      }
    }

    // 修改 toggleTimer 函数
    const toggleTimer = () => {
      if (isRunning.value) {
        clearInterval(timerId.value)
      } else {
        if (!startTime.value) {
          // 初次启动
          startTime.value = Date.now()
          elapsedTime.value = 0
          accumulatedTime.value = 0
          targetTime.value = modes.value.find(m => m.value === currentMode.value).duration
        } else if (isForwardTiming.value) {
          // 从累积时间继续计时
          startTime.value = Date.now() - (elapsedTime.value * 1000)
          console.log("second start with elapsed time:", elapsedTime.value)
        }

        timerId.value = setInterval(() => {
          const now = Date.now()
          if (isForwardTiming.value) {
            // 正向计时：从当前时间计算
            elapsedTime.value = Math.floor((now - startTime.value) / 1000)
          } else {
            // 倒计时
            elapsedTime.value = Math.floor((now - startTime.value) / 1000)
            timeLeft.value = targetTime.value - elapsedTime.value
            if (timeLeft.value <= 0) {
              handleTimerComplete()
            }
          }
        }, 1000)
      }
      isRunning.value = !isRunning.value
    }

    // 修改重置/停止处理
    const resetTimer = () => {
      clearInterval(timerId.value)
      clearTimeout(continuePromptTimer.value)

      const totalTime = accumulatedTime.value + elapsedTime.value
      const isBreakMode = currentMode.value === 'shortBreak' || currentMode.value === 'longBreak'
      const meetsMinTime = isBreakMode ?
        totalTime >= MIN_BREAK_TIME :
        totalTime >= MIN_POMODORO_TIME

      if (sessionComplete.value && !lastSessionSaved.value && meetsMinTime) {
        saveAccumulatedStats()
        emit('update-stats')
      }

      // Reset all states
      isRunning.value = false
      elapsedTime.value = 0
      accumulatedTime.value = 0
      timeLeft.value = modes.value.find(m => m.value === currentMode.value).duration
      targetTime.value = timeLeft.value
      startTime.value = null
      showContinuePrompt.value = false
      sessionComplete.value = false
      lastSessionSaved.value = true
      isForwardTiming.value = false
    }

    const switchMode = (mode) => {
      // Save stats if switching modes with accumulated time
      if (accumulatedTime.value > 0 || elapsedTime.value > 0) {
        const totalTime = accumulatedTime.value + elapsedTime.value
        const isBreakMode = currentMode.value === 'shortBreak' || currentMode.value === 'longBreak'
        const meetsMinTime = isBreakMode ?
          totalTime >= MIN_BREAK_TIME :
          totalTime >= MIN_POMODORO_TIME

        if (meetsMinTime) {
          saveAccumulatedStats()
          emit('update-stats')
        }
      }

      currentMode.value = mode
      resetTimer()
    }

    const createBeepSound = () => {
      // Create new context each time to avoid recycling old nodes
      const context = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = context.createOscillator()
      const gainNode = context.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(context.destination)

      oscillator.type = 'sine'
      oscillator.frequency.value = 880 // A5 note
      gainNode.gain.value = 0.1 // Reduced volume

      return {
        play: () => {
          oscillator.start(context.currentTime)
          setTimeout(() => {
            oscillator.stop()
            // Clean up
            oscillator.disconnect()
            gainNode.disconnect()
          }, 200)
        }
      }
    }

    const playNotificationBeeps = async () => {
      console.log('Playing notification beeps')
      let beepCount = 0

      const playBeep = async () => {
        if (beepCount < 3) {
          try {
            const beep = createBeepSound()
            beep.play()
            beepCount++
            console.log('Played beep:', beepCount)

            if (beepCount < 3) {
              // Schedule next beep after 500ms
              setTimeout(playBeep, 500)
            }
          } catch (err) {
            console.error('Error playing beep:', err)
          }
        }
      }

      await playBeep()
    }

    // 修改计时器完成处理
    const handleTimerComplete = () => {
      clearInterval(timerId.value)
      isRunning.value = false
      sessionComplete.value = true
      lastSessionSaved.value = false

      // 累加时间
      accumulatedTime.value += elapsedTime.value
      console.log('Timer completed:', {
        mode: currentMode.value,
        elapsed: elapsedTime.value,
        accumulated: accumulatedTime.value
      })

      // 开启正向计时模式
      isForwardTiming.value = true
      //startTime.value = Date.now()
      //elapsedTime.value = 0 // 重置 elapsedTime，因为我们要开始新的计时

      // 发送通知
      if (Notification.permission === 'granted') {
        new Notification('番茄钟提醒', {
          body: `${currentMode.value === 'pomodoro' ? '专注' : '休息'}时间结束！`,
          icon: '/favicon.ico'
        })
      }
      playNotificationBeeps()

      showContinuePrompt.value = true
      continuePromptTimer.value = setTimeout(() => {
        if (showContinuePrompt.value) {
          handleContinue()
        }
      }, 30000)
    }

    // 添加停止处理
    const handleStop = () => {
      const totalTime = accumulatedTime.value + elapsedTime.value
      const isBreakMode = currentMode.value === 'shortBreak' || currentMode.value === 'longBreak'
      const meetsMinTime = isBreakMode ?
        totalTime >= MIN_BREAK_TIME :
        totalTime >= MIN_POMODORO_TIME

      if (meetsMinTime) {
        saveAccumulatedStats()
        emit('update-stats')
      }

      // 重置所有状态
      resetTimer()
      isForwardTiming.value = false
      accumulatedTime.value = 0  // 清空累积时间
      showContinuePrompt.value = false
    }

    // 修改继续处理
    const handleContinue = () => {
      showContinuePrompt.value = false
      clearTimeout(continuePromptTimer.value)

      if (!isForwardTiming.value) {
        isForwardTiming.value = true
      }

      // 从当前累积时间开始继续计时
      startTime.value = Date.now()
      //elapsedTime.value = 0 // 重置 elapsedTime，从0开始新的累积

      toggleTimer()
    }

    // 修改模式切换处理
    const handleNext = (nextMode) => {
      showContinuePrompt.value = false
      clearTimeout(continuePromptTimer.value)

      const totalTime = accumulatedTime.value + elapsedTime.value
      const isBreakMode = currentMode.value === 'shortBreak' || currentMode.value === 'longBreak'
      const meetsMinTime = isBreakMode ?
        totalTime >= MIN_BREAK_TIME :
        totalTime >= MIN_POMODORO_TIME

      if (meetsMinTime) {
        saveAccumulatedStats()
        emit('update-stats')
      }

      switchMode(nextMode)
      isForwardTiming.value = false
      toggleTimer()
    }

    const saveAccumulatedStats = () => {
      if (accumulatedTime.value === 0) return

      const now = new Date()
      const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`

      console.log('Saving stats for date:', today)
      const userId = props.currentUser?.id || 'anonymous'

      let stats = userId === 'anonymous' ?
        JSON.parse(localStorage.getItem('anonymous_stats') || '{}') :
        JSON.parse(localStorage.getItem(`stats_${userId}`) || '{}')

      if (!stats[today]) {
        stats[today] = {
          pomodoro: 0,
          shortBreak: 0,
          longBreak: 0,
          focusMinutes: 0,  // 专注时间
          breakMinutes: 0,   // 休息时间
          totalMinutes: 0    // 总时间
        }
      }

      // 区分专注时间和休息时间
      if (currentMode.value === 'pomodoro' && accumulatedTime.value >= MIN_POMODORO_TIME) {
        stats[today].pomodoro++
        stats[today].focusMinutes += Math.floor(accumulatedTime.value / 60)
      } else if (currentMode.value === 'shortBreak' && accumulatedTime.value >= MIN_BREAK_TIME) {
        stats[today].shortBreak++
        stats[today].breakMinutes += Math.floor(accumulatedTime.value / 60)
      } else if (currentMode.value === 'longBreak' && accumulatedTime.value >= MIN_BREAK_TIME) {
        stats[today].longBreak++
        stats[today].breakMinutes += Math.floor(accumulatedTime.value / 60)
      }

      // 更新总时间
      stats[today].totalMinutes = stats[today].focusMinutes + stats[today].breakMinutes

      console.log('Updated stats:', stats[today])

      if (userId === 'anonymous') {
        localStorage.setItem('anonymous_stats', JSON.stringify(stats))
        localStorage.setItem('anonymous_stats_date', today)
      } else {
        localStorage.setItem(`stats_${userId}`, JSON.stringify(stats))
      }

      emit('update-stats')
    }

    const saveStats = () => {
      // 使用本地时间获取今天的日期
      const now = new Date()
      const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`

      console.log('Saving stats for date:', today)

      const userId = props.currentUser?.id || 'anonymous'

      console.log('Saving stats:', {
        userId,
        today,
        currentMode: currentMode.value,
        elapsedTime: elapsedTime.value
      })

      let stats
      if (userId === 'anonymous') {
        stats = JSON.parse(localStorage.getItem('anonymous_stats') || '{}')
        const lastDate = localStorage.getItem('anonymous_stats_date')

        if (lastDate !== today) {
          stats = {}
        }
      } else {
        stats = JSON.parse(localStorage.getItem(`stats_${userId}`) || '{}')
      }

      if (!stats[today]) {
        stats[today] = {
          pomodoro: 0,
          shortBreak: 0,
          longBreak: 0,
          totalMinutes: 0
        }
      }

      // Update stats based on completed timer
      if (currentMode.value === 'pomodoro') {
        stats[today].pomodoro++
        stats[today].totalMinutes += Math.floor(elapsedTime.value / 60)
      } else {
        // Combine both break types into shortBreak count
        stats[today].shortBreak++
      }

      console.log('Updated stats for today:', stats[today])

      // Save stats
      if (userId === 'anonymous') {
        localStorage.setItem('anonymous_stats', JSON.stringify(stats))
        localStorage.setItem('anonymous_stats_date', today)
      } else {
        localStorage.setItem(`stats_${userId}`, JSON.stringify(stats))
      }

      // Emit stats update
      emit('update-stats')
    }

    // Initialize component with reset timer
    onMounted(async () => {
      await requestNotificationPermission()
      const savedMode = localStorage.getItem('pomodoroMode') || 'pomodoro'
      currentMode.value = savedMode
      resetTimer() // Reset timer on mount
    })

    onUnmounted(() => {
      // Save stats if session was complete but not saved
      if (sessionComplete.value && !lastSessionSaved.value) {
        if (currentMode.value === 'pomodoro') {
          if (accumulatedTime.value >= 300) {
            saveAccumulatedStats()
          }
        } else {
          saveAccumulatedStats()
        }
      }
      clearInterval(timerId.value)
      clearTimeout(continuePromptTimer.value)
      if (audioContext.value) {
        audioContext.value.close()
      }
    })

    watch(() => props.customTimes, (newTimes) => {
      const currentModeData = modes.value.find(m => m.value === currentMode.value)
      if (currentModeData) {
        timeLeft.value = currentModeData.duration
      }
    }, { deep: true })

    return {
      modes,
      currentMode,
      timeLeft,
      isRunning,
      formattedTime,
      containerStyle,
      toggleTimer,
      resetTimer,
      switchMode,
      showContinuePrompt,
      handleContinue,
      handleNext,
      elapsedTime,
      targetTime,
      accumulatedTime,
      sessionComplete,
      lastSessionSaved,
      isForwardTiming,
      formatForwardTime,
      handleStop,
    }
  }
}
</script>

<style scoped>
.timer-container {
  padding: 2rem;
  border-radius: 16px;
  transition: all 0.5s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.timer-display {
  font-size: 6rem;
  font-weight: bold;
  color: white;
  text-align: center;
  margin: 2rem 0;
  font-family: 'Courier New', monospace;
}

.mode-selector {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.mode-btn {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.15);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.mode-btn.active {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.05);
}

.controls {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
}

.start-btn,
.reset-btn {
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.start-btn {
  background: rgba(255, 255, 255, 0.9);
  color: var(--current-color);
}

.reset-btn {
  background: rgba(0, 0, 0, 0.2);
  color: white;
}

.start-btn:active,
.reset-btn:active {
  transform: scale(0.95);
}

@media (max-width: 768px) {
  .timer-display {
    font-size: 4rem;
  }

  .mode-selector {
    flex-direction: column;
  }

  .controls {
    flex-direction: column;
  }
}

.continue-prompt {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 10;
}

.prompt-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
}

.continue-btn,
.stop-btn,
.next-btn {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  display: inline-block;
}

.continue-btn {
  background: #38858a;
  color: white;
}

.next-btn {
  background: #ba4949;
  color: white;
}

/* Add new styles */
.stop-btn {
  background: #666;
  color: white;
}

.break-btn {
  background: #38858a;
  color: white;
}
</style>
