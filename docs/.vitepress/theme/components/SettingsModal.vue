<template>
  <div class="modal fade" :class="{ show: show }">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">计时设置</h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label">专注时长（分钟）</label>
            <input v-model.number="times.pomodoro" type="number" class="form-control">
          </div>
          <div class="mb-3">
            <label class="form-label">短休时长（分钟）</label>
            <input v-model.number="times.shortBreak" type="number" class="form-control">
          </div>
          <div class="mb-3">
            <label class="form-label">长休时长（分钟）</label>
            <input v-model.number="times.longBreak" type="number" class="form-control">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="$emit('close')">取消</button>
          <button type="button" class="btn btn-primary" @click="saveSettings">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      times: {
        pomodoro: 25,
        shortBreak: 5,
        longBreak: 15
      }
    }
  },

  methods: {
    saveSettings() {
      // Convert minutes to seconds
      const customTimes = {
        pomodoro: this.times.pomodoro * 60,
        shortBreak: this.times.shortBreak * 60,
        longBreak: this.times.longBreak * 60
      }

      // Save to localStorage
      localStorage.setItem('customTimes', JSON.stringify(customTimes))

      // Emit the converted times (in seconds)
      this.$emit('settings-updated', customTimes)
      this.$emit('close')
    }
  },

  created() {
    // Load saved settings when component creates
    const savedTimes = localStorage.getItem('customTimes')
    if (savedTimes) {
      const times = JSON.parse(savedTimes)
      // Convert seconds back to minutes for display
      this.times = {
        pomodoro: Math.floor(times.pomodoro / 60),
        shortBreak: Math.floor(times.shortBreak / 60),
        longBreak: Math.floor(times.longBreak / 60)
      }
    }
  }
}
</script>

<style>
.modal {
  display: none;
  /* 默认隐藏 */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1050;
}

.modal.show {
  display: block;
  /* 显示模态框 */
}

.modal-dialog {
  max-width: 500px;
  margin: 1.75rem auto;
}

.modal-content {
  border-radius: 8px;
  overflow: hidden;
}

.modal-header {
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
  padding: 1rem 1.5rem;
}

.modal-title {
  margin: 0;
  font-size: 1.25rem;
}

.modal-body {
  padding: 1.5rem;
  background-color: #f8f9fa;

}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-control {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  padding: 1rem 1.5rem;
  border-top: 1px solid #dee2e6;
  background-color: #f8f9fa;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.btn-secondary {
  background-color: #6c757d;
  color: #fff;
  border: none;
  margin-right: 0.5rem;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
  border: none;
}
</style>
