<template>
  <div class="modal fade" :class="{ show }" tabindex="-1" v-show="show" @click.self="handleClose">
    <div class="modal-dialog modal-xl">
      <!-- modal-dialog-scrollable -->
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            专注统计
          </h5>
          <button type="button" class="btn-close" @click="handleClose" aria-label="Close"></button>
        </div>
        <div class="modal-body" style="overflow-y: auto; height: calc(90vh - 120px);">
          <!-- 日期范围选择 -->
          <!-- <div class="row mb-4">
            <div class="col-md-6"> -->
          <div class="date-range-wrapper mb-4">
            <div class="input-group date-range">
              <span class="input-group-text">日期范围</span>
              <input type="date" class="form-control" v-model="startDate">
              <input type="date" class="form-control" v-model="endDate">
              <button class="btn btn-primary" @click="updateDateRange">更新</button>
            </div>
          </div>
          <!-- </div>
          </div> -->

          <!-- 总计统计 -->
          <div class="card mb-4">
            <div class="card-body">
              <h6 class="card-title">总计数据</h6>
              <div class="row text-center">
                <div class="col-md-3">
                  <div class="h3 mb-0">{{ totalStats.pomodoro }}</div>
                  <small class="text-muted">总专注次数</small>
                </div>
                <div class="col-md-3">
                  <div class="h3 mb-0">{{ Math.round(totalStats.focusMinutes / 60) }}</div>
                  <small class="text-muted">总专注小时</small>
                </div>
                <div class="col-md-3">
                  <div class="h3 mb-0">{{ totalStats.shortBreak + totalStats.longBreak }}</div>
                  <small class="text-muted">总休息次数</small>
                </div>
                <div class="col-md-3">
                  <div class="h3 mb-0">{{ Math.round(totalStats.breakMinutes / 60) }}</div>
                  <small class="text-muted">总休息小时</small>
                </div>
              </div>
            </div>
          </div>

          <!-- 图表 -->
          <div class="row">
            <div class="col-md-8 mb-4">
              <div class="card">
                <div class="card-body">
                  <h6 class="card-title">专注趋势</h6>
                  <canvas ref="trendChartRef"></canvas>
                </div>
              </div>
            </div>
            <div class="col-md-4 mb-4">
              <div class="card">
                <div class="card-body">
                  <h6 class="card-title">时间分配</h6>
                  <canvas ref="pieChartRef"></canvas>
                </div>
              </div>
            </div>
          </div>

          <!-- 详细数据表格 -->
          <div class="card">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center mb-3 hor_align">
                <h6 class="card-title mb-0">详细数据</h6>
                <button class="btn btn-sm btn-outline-primary edit_btn" @click="toggleEditMode">
                  {{ isEditing ? '保存' : '编辑' }}
                </button>
              </div>
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th>日期</th>
                      <th>专注次数</th>
                      <th>专注总时间(分钟)</th>
                      <th>
                        <template v-if="isEditing">
                          <div class="d-flex rest">
                            <span>短休息</span>
                            <span>长休息</span>
                          </div>
                        </template>
                        <template v-else>休息总次数</template>
                      </th>
                      <th>休息总时间(分钟)</th>
                      <th>统计总时间(分钟)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(day, date) in stats" :key="date">
                      <td>{{ formatDate(date) }}</td>
                      <td>
                        <div v-if="isEditing" class="edit-field">
                          <input type="number" v-model.number="editedStats[date].pomodoro" min="0"
                            class="form-control form-control-sm">
                        </div>
                        <span v-else>{{ day.pomodoro || 0 }}</span>
                      </td>
                      <td>
                        <div v-if="isEditing" class="edit-field">
                          <input type="number" v-model.number="editedStats[date].focusMinutes" min="0"
                            class="form-control form-control-sm">
                        </div>
                        <span v-else>{{ day.focusMinutes || 0 }}</span>
                      </td>
                      <td>
                        <div v-if="isEditing" class="edit-field">
                          <input type="number" v-model.number="editedStats[date].shortBreak" min="0"
                            class="form-control form-control-sm me-1" style="width: 45%;">
                          <input type="number" v-model.number="editedStats[date].longBreak" min="0"
                            class="form-control form-control-sm" style="width: 45%;">
                        </div>
                        <span v-else>{{ (day.shortBreak || 0) + (day.longBreak || 0) }}</span>
                      </td>
                      <td>
                        <div v-if="isEditing" class="edit-field">
                          <input type="number" v-model.number="editedStats[date].breakMinutes" min="0"
                            class="form-control form-control-sm">
                        </div>
                        <span v-else>{{ day.breakMinutes || 0 }}</span>
                      </td>
                      <td>
                        <div v-if="isEditing" class="edit-field">
                          <input type="number" v-model.number="editedStats[date].totalMinutes" min="0"
                            class="form-control form-control-sm">
                        </div>
                        <span v-else>{{ day.totalMinutes || 0 }}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch, nextTick } from 'vue'
import {
  Chart,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js/auto'
// import { Bar } from 'vue-chartjs'

// Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

// import 'bootstrap/dist/css/bootstrap.min.css'


export default {
  props: {
    show: {
      type: Boolean,
      required: true
    },
    statsData: {
      type: Object,
      default: () => ({})
    }
  },

  emits: ['close', 'update-date-range', 'save-stats'],

  setup(props, { emit }) {
    const stats = ref({})
    const totalStats = ref({
      pomodoro: 0,
      shortBreak: 0,
      longBreak: 0,
      totalMinutes: 0,
      focusMinutes: 0,
      breakMinutes: 0
    })

    // Watch statsData prop changes
    watch(() => props.statsData, (newData) => {
      console.log('Stats data updated:', newData)
      console.log('Stats data type:', typeof newData)
      console.log('Stats data keys:', Object.keys(newData))

      if (newData && Object.keys(newData).length > 0) {
        console.log('Updating stats with new data')
        stats.value = JSON.parse(JSON.stringify(newData))
        totalStats.value = calculateTotalStats(newData)
        nextTick(() => {
          console.log('Current stats before chart update:', stats.value)
          updateCharts()
        })
      }
    }, { immediate: true, deep: true })

    // Chart refs
    const trendChartRef = ref(null)
    const pieChartRef = ref(null)
    let trendChart = null
    let pieChart = null

    // Date range with proper initialization
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(today.getDate() - 29)
    thirtyDaysAgo.setHours(0, 0, 0, 0)

    // 使用本地时间格式
    const endDate = ref(today.toLocaleDateString('sv').split(' ')[0])  // sv locale gives YYYY-MM-DD format
    const startDate = ref(thirtyDaysAgo.toLocaleDateString('sv').split(' ')[0])

    const formatDate = (dateStr) => {
      const date = new Date(dateStr)
      const options = { month: 'numeric', day: 'numeric' }
      return new Intl.DateTimeFormat('zh-CN', options).format(date)
    }

    const updateDateRange = () => {
      console.log('Updating date range:', { start: startDate.value, end: endDate.value })
      emit('update-date-range', startDate.value, endDate.value)
    }

    const updateCharts = () => {
      console.log('Starting updateCharts function')
      console.log('Current stats:', stats.value)

      nextTick(() => {
        // Clear existing charts
        if (trendChart) {
          console.log('Destroying existing trend chart')
          trendChart.destroy()
          trendChart = null
        }
        if (pieChart) {
          console.log('Destroying existing pie chart')
          pieChart.destroy()
          pieChart = null
        }

        // Get sorted dates
        const dates = Object.keys(stats.value).sort()
        console.log('Sorted dates:', dates)

        // Create trend chart
        const trendCtx = trendChartRef.value?.getContext('2d')
        if (trendCtx) {
          console.log('Found trend chart context')

          // Prepare trend data
          const trendData = dates.map(date => {
            const minutes = stats.value[date]?.focusMinutes || 0
            console.log(`Date ${date}: ${minutes} minutes`)
            return {
              date: formatDate(date),
              minutes: minutes
            }
          })

          console.log('Trend chart data:', trendData)

          trendChart = new Chart(trendCtx, {
            type: 'line',
            data: {
              labels: trendData.map(d => d.date),
              datasets: [{
                label: '专注时间(小时)',
                data: trendData.map(d => d.minutes / 60),
                borderColor: '#ba4949',
                backgroundColor: 'rgba(186, 73, 73, 0.1)',
                fill: false,
                pointStyle: 'circle',
                pointRadius: 4,
                pointHoverRadius: 6,
                tension: 0.1
              }]
            },
            options: {
              responsive: true,
              interaction: {
                intersect: false,
              },
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: value => `${value.toFixed(1)}h`,
                  }
                }
              }
            }
          })
        } else {
          console.warn('Trend chart context not found')
        }

        // Create pie chart
        const pieCtx = pieChartRef.value?.getContext('2d')
        if (pieCtx) {
          console.log('Found pie chart context')

          // Calculate totals
          const totalFocusMinutes = dates.reduce((sum, date) => {
            const minutes = stats.value[date]?.focusMinutes || 0
            console.log(`Date ${date} focus minutes: ${minutes}`)
            return sum + minutes
          }, 0)

          const totalBreakMinutes = dates.reduce((sum, date) => {
            const minutes = stats.value[date]?.breakMinutes || 0
            console.log(`Date ${date} break minutes: ${minutes}`)
            return sum + minutes
          }, 0)

          console.log('Total minutes:', {
            focus: totalFocusMinutes,
            break: totalBreakMinutes
          })

          pieChart = new Chart(pieCtx, {
            type: 'pie',
            data: {
              labels: ['专注时间', '休息时间'],
              datasets: [{
                data: [totalFocusMinutes, totalBreakMinutes],
                backgroundColor: ['#ba4949', '#38858a']
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false
            }
          })
        } else {
          console.warn('Pie chart context not found')
        }
      })
    }


    const calculateTotalStats = (statsData) => {
      if (!statsData || typeof statsData !== 'object') {
        return {
          pomodoro: 0,
          shortBreak: 0,
          longBreak: 0,
          totalMinutes: 0,
          focusMinutes: 0,
          breakMinutes: 0
        }
      }

      return Object.values(statsData).reduce((total, day) => ({
        pomodoro: total.pomodoro + (day?.pomodoro || 0),
        shortBreak: total.shortBreak + (day?.shortBreak || 0),
        longBreak: total.longBreak + (day?.longBreak || 0),
        totalMinutes: total.totalMinutes + (day?.totalMinutes || 0),
        focusMinutes: total.focusMinutes + ((day?.pomodoro || 0) * 25),
        breakMinutes: total.breakMinutes + ((day?.shortBreak || 0) * 5) + ((day?.longBreak || 0) * 15)
      }), { pomodoro: 0, shortBreak: 0, longBreak: 0, totalMinutes: 0, focusMinutes: 0, breakMinutes: 0 })
    }

    // Watch for show prop changes to update charts
    watch(() => props.show, (newVal) => {
      if (newVal) {
        nextTick(() => {
          updateDateRange()
        })
      }
    }, { immediate: true })

    // Add watcher for stats changes
    watch(() => stats.value, (newStats) => {
      console.log('Stats changed:', {
        hasData: !!newStats,
        dateCount: Object.keys(newStats || {}).length
      })
    }, { deep: true })

    // Add these to your setup function
    const isEditing = ref(false)
    const editedStats = ref({})

    const toggleEditMode = () => {
      if (isEditing.value) {
        // Save changes
        Object.assign(stats.value, editedStats.value)
        emit('save-stats', editedStats.value)
        isEditing.value = false
      } else {
        // Enter edit mode
        editedStats.value = JSON.parse(JSON.stringify(stats.value))
        isEditing.value = true
      }
    }

    // Update the watch for date range changes
    watch([startDate, endDate], () => {
      updateDateRange()
    }, { immediate: true })

    onMounted(() => {
      console.log('Component mounted')
      console.log('Trend chart ref:', trendChartRef.value)
      console.log('Pie chart ref:', pieChartRef.value)
      nextTick(() => {
        console.log('After nextTick - Trend chart ref:', trendChartRef.value)
        console.log('After nextTick - Pie chart ref:', pieChartRef.value)
      })
    })

    // Add new close handler
    const handleClose = async () => {
      if (isEditing.value) {
        const confirmSave = window.confirm('是否保存当前修改？')
        if (confirmSave) {
          // Save changes
          Object.assign(stats.value, editedStats.value)
          emit('save-stats', editedStats.value)
          isEditing.value = false
        } else {
          // Discard changes
          editedStats.value = JSON.parse(JSON.stringify(stats.value))
          isEditing.value = false
        }
      }
      emit('close')
    }

    return {
      stats,
      totalStats,
      startDate,
      endDate,
      formatDate,
      updateDateRange,
      trendChartRef,
      pieChartRef,
      isEditing,
      editedStats,
      toggleEditMode,
      handleClose
    }
  }
}
</script>

<style>
:deep(.row) {
  /* // Vue 3深度选择器 */
  @extend .row;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0);
  z-index: 1050;
  visibility: hidden;
  opacity: 0;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal.show {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
  background: rgba(0, 0, 0, 0.5);
}

.modal-dialog {
  transform: scale(0.7);
  opacity: 0;
  transition: all 0.3s ease;
  margin: 1.75rem auto;
  max-width: 1000px;
  width: 90%;
}

.modal.show .modal-dialog {
  transform: scale(1);
  opacity: 1;
}

.modal.show {
  display: flex !important;
  /* 使用flex布局 */
  align-items: center;
  /* 垂直居中 */
  justify-content: center;
  opacity: 1;
  transition: opacity .15slinear;
}

/* 为内容添加过渡效果 */
.modal-dialog {
  transform: translateY(-20px);
  transition: transform 0.3s ease;
}

.modal.show .modal-dialog {
  transform: translateY(0);
}

.modal-dialog.modal-xl {
  max-width: 1000px;
  max-height: 90vh;
  /* margin: 1.75rem auto; */
  width: 100%;
  /* 二次确认高度 */
  margin: 0 auto;
  /* 水平居中 */
}

/* Remove incorrect height and margin from modal-content */
/* .modal-content {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  height: 90vh;
} */

.modal-content {
  position: relative;
  width: 100%;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

.hor_align {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.edit_btn {
  color: #6c757d;
  text-decoration: none;
}

.edit_btn:hover {
  color: #212529;
  text-decoration: underline;
}

/* Add styles for charts */

canvas {
  width: 100% !important;
  height: 250px !important;
}

/* Add styles for modal header */
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
  background-color: #f8f9fa;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.modal-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 500;
}

.btn-close {
  padding: 0.5rem;
  margin: -0.5rem -0.5rem -0.5rem auto;
  background: transparent url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z'/%3e%3c/svg%3e") center/1em auto no-repeat;
  border: 0;
  border-radius: 0.375rem;
  opacity: 0.5;
  cursor: pointer;
  width: 1em;
  height: 1em;
}

.btn-close:hover {
  opacity: 0.75;
}

/* ...rest of your existing styles... */

/* .modal-body {
  position: relative;
  flex: 1 1 auto;
  padding: var(--bs-modal-padding);
} */

.modal-body {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}


.modal-dialog-scrollable .modal-content {
  overflow: hidden;
}

.modal-dialog-scrollable .modal-body {
  padding-right: 15px;
  /* 防止滚动条遮挡内容 */
}



/* .row {
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 0;
  display: flex;
  flex-wrap: wrap;
  margin-top: calc(-1* var(--bs-gutter-y));
  margin-right: calc(-.5* var(--bs-gutter-x));
  margin-left: calc(-.5* var(--bs-gutter-x));
} */

.text-center {
  text-align: center !important;
}

.date-range-wrapper {
  padding: 0rem;
  width: 100%;
}

.date-range {
  display: flex;
  width: 100%;
}

.input-group {
  display: flex;
  align-items: stretch;
  width: 100%;
}

.input-group .form-control {
  flex: 1 1 0;
  min-width: 140px;
}

.input-group .btn-primary {
  flex: 0 0 120px;
  white-space: nowrap;
  min-width: 80px;
}

.input-group-text {
  display: flex;
  text-align: center;
  white-space: nowrap;
  align-items: center;
  background-color: #f8f9fa;
  border: 1px solid #ced4da;
  padding: 1%;
}

/* .input-group-text {
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  text-align: center;
  white-space: nowrap;
  background-color: #f8f9fa;
  border: 1px solid #ced4da;
  padding: 0.375rem 0.75rem;
} */

.form-control {
  position: relative;
  flex: 1 1 auto;
  width: 1%;
  min-width: 0;
}

.btn-primary {
  background-color: #ba4949;
  border-color: #ba4949;
  color: white;
}

.btn-primary:hover {
  background-color: #a13e3e;
  border-color: #a13e3e;
}

.card {
  margin-bottom: 1rem;
  border: 1px solid rgba(0, 0, 0, .175);
  border-radius: 0.375rem;
  display: flex;
  flex-direction: column;
  word-wrap: break-word;
  min-width: 0;
  background-clip: border-box;
}

.card-body {
  flex: 1 1 auto;
  padding: 1rem 1rem;
  color: rgb(8, 7, 7);
  word-wrap: break-word;
}

.card-title {
  margin-bottom: 0.5rem;
}

/* .row {
  display: flex;
  flex-wrap: wrap;
  margin-top: 0;
  margin-left: 0.75rem;
  margin-right: 0.75rem;
  min-width: 100px;
} */

.text-center {
  text-align: center !important;
}

/* Row and Column styles */
.row {
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 0;
  display: flex;
  flex-wrap: wrap;
  margin-top: calc(-1 * var(--bs-gutter-y));
  margin-right: calc(-.5 * var(--bs-gutter-x));
  margin-left: calc(-.5 * var(--bs-gutter-x));
}

.col-md-3 {
  flex: 0 0 auto;
  width: 25%;
  padding-right: calc(var(--bs-gutter-x) * .5);
  padding-left: calc(var(--bs-gutter-x) * .5);
}

.col-md-4 {
  flex: 0 0 auto;
  width: 33.33333333%;
  padding-right: calc(var(--bs-gutter-x) * .5);
  padding-left: calc(var(--bs-gutter-x) * .5);
}

.col-md-6 {
  flex: 0 0 auto;
  width: 50%;
  padding-right: calc(var(--bs-gutter-x) * .5);
  padding-left: calc(var(--bs-gutter-x) * .5);
}

.col-md-8 {
  flex: 0 0 auto;
  width: 66.66666667%;
  padding-right: calc(var(--bs-gutter-x) * .5);
  padding-left: calc(var(--bs-gutter-x) * .5);
}

.mb-4 {
  margin-bottom: 1.5rem !important;
}

.table {
  width: 100%;
  margin-bottom: 1rem;
  color: #212529;
  table-layout: auto;
  text-align: center;
}

.table th,
.table td {
  padding: 0.75rem;
  vertical-align: middle;
  border-top: 1px solid #dee2e6;
  white-space: normal;
  /* Changed from nowrap to normal to allow wrapping */
  min-width: 80px;
  /* Set minimum width for columns */
  max-width: 200px;
  /* Set maximum width for columns */
  overflow-wrap: break-word;
  /* Allow word breaking */
  word-wrap: break-word;
  text-align: center;
}

.rest {
  display: flex;
  flex-wrap: wrap;
  /* Allow wrapping for narrow screens */
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 5px;
  /* Add gap between wrapped items */
}

.rest span {
  flex: 1;
  text-align: center;
  padding: 5px;
  border-radius: 4px;
  min-width: 60px;
  /* Ensure minimum width for readability */
}

@media (max-width: 768px) {
  .table {
    display: block;
    overflow-x: auto;
    /* Enable horizontal scrolling on small screens */
  }

  .table th,
  .table td {
    min-width: 60px;
    /* Smaller minimum width on mobile */
  }
}

.edit-field {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.edit-field input {
  width: 80px;
  text-align: center;
}

.form-control-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  border-radius: 0.2rem;
}
</style>
