<template>
  <div class="app-main">
    <div class="navbar navbar-expand-lg custom-navbar">
      <div class="menu-pomo">
        <div>
          <a :href="getBaseUrl('/')" class="navbar-brand">🍅 番茄钟</a>
        </div>
        <div class="d-flex align-items-center mt-3">
          <button @click="showReport" class="btn btn-link nav-link">统计</button>
          <button @click="showSettings" class="btn btn-link nav-link">设置</button>
          <!-- <button @click="showRoom" class="btn btn-link nav-link">自习室</button>
          <button @click="showWishWall" class="btn btn-link nav-link">许愿墙</button> -->
          <div class="user-menu-container">
            <button @click="toggleUserMenu" class="btn user-menu" :class="{ 'logged-in': currentUser }">
              <span v-if="currentUser">{{ currentUser.username }}</span>
              <span v-else>登录/注册</span>
            </button>
            <!-- Add logout dropdown -->
            <div v-if="currentUser" class="logout-dropdown">
              <button @click="logout" class="logout-btn">登出</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 主内容 -->
    <main class="container">
      <TimerComponent :customTimes="timerSettings" :currentUser="currentUser" @update-stats="handleStatsUpdate" />
    </main>

    <!-- 模态框 -->
    <LoginModal v-if="showLoginModal" :show="showLoginModal" @close="handleLoginModalClose"
      @login-success="handleLoginSuccess" />
    <ReportModal :show="showReportModal" :stats-data="currentStats" @close="showReportModal = false"
      @update-date-range="handleDateRangeUpdate" @save-stats="handleStatsUpdate" />
    <SettingsModal v-if="showSettingsModal" :show="showSettingsModal" @close="showSettingsModal = false"
      @settings-updated="handleSettingsUpdate" />
    <RoomModal v-if="showRoomModal" :show="showRoomModal" :current-user="currentUser" @close="showRoomModal = false"
      @showLogin="handleShowLogin" />
    <WishWallModal v-if="showWishWallModal" :show="showWishWallModal" :current-user="currentUser"
      @close="showWishWallModal = false" />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import TimerComponent from './Timer.vue'
import LoginModal from './LoginModal.vue'
import ReportModal from './ReportModal.vue'
import SettingsModal from './SettingsModal.vue'
import RoomModal from './RoomModal.vue'
import WishWallModal from './WishWallModal.vue'
import { withBase } from 'vitepress'

import { createApp } from 'vue';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'chart.js';
// import 'chartjs-adapter-date-fns';


export default {
  components: {
    TimerComponent,
    LoginModal,
    ReportModal,
    SettingsModal,
    RoomModal,
    WishWallModal
  },
  setup() {
    // Add getLocalStorage helper function
    const getLocalStorage = (key) => {
      try {
        const item = localStorage.getItem(key)
        return item ? JSON.parse(item) : null
      } catch (e) {
        console.error('Error reading from localStorage:', e)
        return null
      }
    }

    const showLoginModal = ref(false)
    const showReportModal = ref(false)
    const showSettingsModal = ref(false)
    const showRoomModal = ref(false)
    const showWishWallModal = ref(false)

    const currentUser = ref(null)

    // Add ref for timer settings
    const timerSettings = ref({
      pomodoro: 25 * 60,
      shortBreak: 5 * 60,
      longBreak: 15 * 60
    })

    // Add ref for report data
    const reportData = ref({})

    // Add ref for current stats
    const currentStats = ref({})

    onMounted(() => {
      // Use the helper function
      currentUser.value = getLocalStorage('currentUser')

      // Load settings on mount
      const savedSettings = getLocalStorage('customTimes')
      if (savedSettings) {
        timerSettings.value = savedSettings
      }

      // 加载保存的日期范围
      const savedStartDate = localStorage.getItem('reportStartDate');
      const savedEndDate = localStorage.getItem('reportEndDate');

      if (savedStartDate && savedEndDate) {
        console.log('Loading saved date range:', { start: savedStartDate, end: savedEndDate });
        handleReportData(savedStartDate, savedEndDate);
      }
    })


    const toggleUserMenu = () => {
      if (!currentUser.value) {
        console.log('Opening login modal')
        showLoginModal.value = true
      }
      // Remove the else case to prevent any action when logged in
    }

    const showReport = () => {
      showReportModal.value = true  // 直接设置为 true
    }

    const showSettings = () => {
      showSettingsModal.value = true // 直接设置为 true，而不是切换
    }

    const showRoom = () => {
      showRoomModal.value = true
    }

    const showWishWall = () => {
      showWishWallModal.value = !showWishWallModal.value
    }

    // Add withBase helper
    const getBaseUrl = (path) => withBase(path)

    // Update the handleSettingsUpdate function
    const handleSettingsUpdate = (newSettings) => {
      console.log('Settings updated:', newSettings)
      timerSettings.value = newSettings
    }

    // Update getStatsData to use the helper
    const getStatsData = () => {
      const currentUser = getLocalStorage('currentUser')
      if (!currentUser) return {}

      return getLocalStorage(`stats_${currentUser.id}`) || {}
    }

    // 将统计数据传递给 ReportModal
    const handleReportData = (startDate, endDate) => {
      console.log('Handling report data:', { startDate, endDate });
      const user = getLocalStorage('currentUser');
      console.log('Current user:', user);

      const statsKey = user ? `stats_${user.id}` : 'anonymous_stats';
      const statsData = getLocalStorage(statsKey);
      console.log('Retrieved stats:', { key: statsKey, data: statsData });

      // 创建标准化范围数据
      const range = {};
      let current = new Date(startDate);
      const endDateTime = new Date(endDate);

      while (current <= endDateTime) {
        const dateStr = current.toISOString().split('T')[0];
        range[dateStr] = {
          pomodoro: 0,
          shortBreak: 0,
          longBreak: 0,
          focusMinutes: 0,
          breakMinutes: 0,
          totalMinutes: 0
        };
        current.setDate(current.getDate() + 1);
      }

      // 合并和规范化实际数据
      if (statsData) {
        Object.entries(statsData).forEach(([date, data]) => {
          if (range[date]) {
            range[date] = {
              pomodoro: data.pomodoro || 0,
              shortBreak: data.shortBreak || 0,
              longBreak: data.longBreak || 0,
              focusMinutes: data.focusMinutes || 0,
              breakMinutes: data.breakMinutes || 0,
              totalMinutes: (data.focusMinutes || 0) + (data.breakMinutes || 0)
            };
          }
        });
      }

      console.log('Processed range data:', range);
      currentStats.value = range;
    }

    // Add handleDateRangeUpdate function
    const handleDateRangeUpdate = (startDate, endDate) => {
      if (typeof window === 'undefined') return;

      console.log('Updating date range:', { startDate, endDate });
      try {
        localStorage.setItem('reportStartDate', startDate);
        localStorage.setItem('reportEndDate', endDate);
        handleReportData(startDate, endDate);
      } catch (e) {
        console.error('Error updating date range:', e);
      }
    }

    const handleLoginModalClose = () => {
      console.log('Login modal closing')
      showLoginModal.value = false
    }

    const handleLoginSuccess = (user) => {
      console.log('Login success:', user)
      currentUser.value = user
      showLoginModal.value = false

      // Initialize user stats if needed
      const userStats = getLocalStorage(`stats_${user.id}`)
      if (!userStats) {
        console.log('Initializing stats for new user')
        localStorage.setItem(`stats_${user.id}`, JSON.stringify({}))
      }
    }

    const loadUserStats = () => {
      const userId = currentUser.value?.id || 'anonymous';
      const storageKey = userId === 'anonymous' ? 'anonymous_stats' : `stats_${userId}`;
      const stats = getLocalStorage(storageKey) || {};
      currentStats.value = stats;
      console.log('Loaded user stats:', stats);
      return stats;
    };

    const handleStatsUpdate = (updatedStats) => {
      console.log('Handling stats update:', updatedStats);
      // Update local storage
      const userId = currentUser.value?.id || 'anonymous';
      const storageKey = userId === 'anonymous' ? 'anonymous_stats' : `stats_${userId}`;
      localStorage.setItem(storageKey, JSON.stringify(updatedStats));

      // Update current stats
      currentStats.value = updatedStats;
      console.log('Updated stats:', currentStats.value);
    };

    const logout = () => {
      console.log('Logging out')
      localStorage.removeItem('currentUser')
      currentUser.value = null
    }

    const handleShowLogin = () => {
      showRoomModal.value = false;
      showLoginModal.value = true;
    };

    return {
      showLoginModal,
      showReportModal,
      showSettingsModal,
      showRoomModal,
      showWishWallModal,
      currentUser,
      toggleUserMenu,
      showReport,
      showSettings,
      showRoom,
      showWishWall,
      getBaseUrl,
      handleSettingsUpdate,
      timerSettings,
      handleReportData,
      getLocalStorage, // Export if needed elsewhere
      reportData,
      handleLoginModalClose,
      handleLoginSuccess,
      loadUserStats,
      handleStatsUpdate,
      logout,
      currentStats,
      handleDateRangeUpdate, // Add this to returns
      handleShowLogin
    }
  }
}
</script>

<style scoped>
.custom-navbar {
  /*  background-color: rgba(var(--vp-c-brand-soft), 0.1);*/
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 1rem 0;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--vp-c-brand) !important;
  text-decoration: none !important;
  /* Remove underline */
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Add additional style to ensure no underline on hover */
.navbar-brand:hover {
  text-decoration: none !important;
  color: var(--vp-c-brand) !important;
}

.align-items-center {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  justify-content: center;
}

.nav-link {
  border: 1px solid var(--vp-c-border);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.nav-link:hover {
  background-color: rgba(133, 17, 17, 0.725);
  color: white;
  border: 0px;
}

.user-menu {
  border: 1px solid var(--vp-c-border);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.user-menu:hover {
  background-color: rgba(133, 17, 17, 0.725);
  color: white;
  border: 0px;
}

.user-menu.logged-in {
  cursor: default;
  opacity: 1;
  background-color: rgba(186, 73, 73, 0.1);
  border-color: rgba(186, 73, 73, 0.2);
  color: #ba4949;
  user-select: none;
}

.user-menu.logged-in:hover {
  background-color: rgba(186, 73, 73, 0.1);
  color: #ba4949;
}

.manager-menu {
  border: 1px solid var(--vp-c-border);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.manager-menu:hover {
  background-color: rgba(133, 17, 17, 0.725);
  color: white;
  border: 0px;
}

.user-menu-container {
  position: relative;
  display: inline-block;
}

.user-menu.logged-in:hover+.logout-dropdown,
.logout-dropdown:hover {
  opacity: 1;
  visibility: visible;
}

.logout-dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease, visibility 0.2s ease;
  padding: 4px 0;
}

.logout-btn {
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  background-color: white;
  color: #ba4949;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  text-align: center;
  font-size: 14px;
  line-height: 1.5;
}

.logout-btn:hover {
  background-color: #ba4949;
  color: white;
  border-color: #ba4949;
}
</style>
