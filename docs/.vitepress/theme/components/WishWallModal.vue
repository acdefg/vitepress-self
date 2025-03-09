<template>
  <!-- Update modal dialog to be responsive -->
  <div class="modal" :class="{ show }" tabindex="-1" v-show="show" @click.self="handleClose">
    <div class="modal-dialog modal-fullscreen-md-down modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">愿望墙</h5>
          <button type="button" class="btn-close" @click="$emit('close')" aria-label="Close"></button>
        </div>
        <div class="modal-body wish-wall-container">
          <div class="controls-container">
            <div class="wish-controls">
              <button @click="showWishForm = true" class="btn btn-primary">
                <i class="fa fa-star"></i>许愿
              </button>
              <div class="filter-controls">
                <label class="switch">
                  <input type="checkbox" v-model="showFulfilled">
                  <span class="slider round"></span>
                </label>
                <span class="filter-label">显示已还愿</span>
              </div>
            </div>
          </div>

          <div ref="wishContainer" class="wish-container" :data-expandable="containerSize.expandable">
            <div v-for="wish in filteredWishes" :key="wish.id" class="wish-bullet" :class="[
              wish.type,
              wish.fulfilled ? 'fulfilled' : '',
              wish.priority,
              wish.isNew ? 'isNew' : ''
            ]" :style="bulletStyle(wish)" :data-active="activeWishId === wish.id" @click="handleWishClick(wish)">
              <div class="wish-content">
                <p class="wish-text">{{ wish.content }}</p>
                <div class="wish-footer">
                  <span class="wish-user">{{ wish.user }}</span>
                  <span class="wish-date">{{ formatDate(wish.date) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 许愿表单 -->
    <div v-if="showWishForm" class="modal-form">
      <div class="form-content">
        <h3>许下你的愿望</h3>
        <textarea v-model="wishContent" class="form-control mb-3" placeholder="写下你的愿望..." maxlength="50"></textarea>
        <div class="form-group mb-3">
          <label class="form-label">选择优先级</label>
          <div class="priority-selector">
            <div class="priority-option" v-for="priority in priorities" :key="priority.value"
              :class="{ active: selectedPriority === priority.value }" :style="{ backgroundColor: priority.color }"
              @click="selectedPriority = priority.value">
              {{ priority.label }}
            </div>
          </div>
        </div>
        <div class="char-count">{{ wishContent.length }}/50</div>
        <div class="form-buttons">
          <button @click="cancelWish" class="btn btn-secondary">取消</button>
          <button @click="submitWish" class="btn btn-primary" :disabled="!wishContent.trim()">
            确认
          </button>
        </div>
      </div>
    </div>

    <!-- 还愿表单 -->
    <div v-if="showFulfillForm" class="modal-form">
      <div class="form-content">
        <h3>分享你的成功</h3>
        <div class="original-wish mb-3">
          <h5>原愿望:</h5>
          <p>{{ selectedWish?.content }}</p>
        </div>
        <textarea v-model="fulfillContent" class="form-control mb-3" placeholder="分享你的故事（可选）..."
          maxlength="50"></textarea>
        <div class="char-count">{{ fulfillContent.length }}/50</div>
        <div class="form-buttons">
          <button @click="cancelFulfill" class="btn btn-secondary">取消</button>
          <button @click="submitFulfill" class="btn btn-primary">
            确认还愿
          </button>
        </div>
      </div>
    </div>

    <!-- 愿望详情弹窗 -->
    <div v-if="selectedWish && !showFulfillForm" class="modal-form">
      <div class="form-content">
        <h3>{{ selectedWish.fulfilled ? '已还愿' : '愿望详情' }}</h3>
        <div class="wish-detail">
          <p class="wish-detail-content">{{ selectedWish.content }}</p>
          <!-- 添加优先级修改选项 -->
          <div v-if="canEdit(selectedWish)" class="priority-edit">
            <label class="form-label">修改优先级</label>
            <div class="priority-selector">
              <div v-for="priority in priorities" :key="priority.value" :class="[
                'priority-option',
                { active: selectedWish.priority === priority.value }
              ]" :style="{ backgroundColor: priority.color }" @click="updatePriority(selectedWish, priority.value)">
                {{ priority.label }}
              </div>
            </div>
          </div>
          <div v-if="selectedWish.fulfillContent" class="fulfill-content">
            <h5>还愿记录:</h5>
            <p>{{ selectedWish.fulfillContent }}</p>
          </div>
          <div class="wish-meta">
            <span>{{ selectedWish.user }}</span>
            <span>许愿时间：{{ formatDate(selectedWish.date) }}</span>
            <span v-if="selectedWish.fulfilled" class="fulfill-date">
              还愿时间：{{ formatDate(selectedWish.fulfillDate) }}
            </span>
          </div>
        </div>
        <div class="form-buttons">
          <button @click="selectedWish = null" class="btn btn-secondary">关闭</button>
          <button v-if="canFulfill(selectedWish)" @click="openFulfillForm" class="btn btn-success">
            还愿
          </button>
          <button v-if="canDelete(selectedWish)" @click="deleteWish(selectedWish)" class="btn btn-danger">
            删除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch, onBeforeUnmount } from 'vue'

const props = defineProps({
  show: Boolean,
  currentUser: Object
})

const emit = ['close']

// State
const wishes = ref([])
const wishContainer = ref(null)
const showWishForm = ref(false)
const showFulfillForm = ref(false)
const wishContent = ref('')
const fulfillContent = ref('')
const selectedWish = ref(null)
const showFulfilled = ref(true)
const selectedPriority = ref('normal')
let scrollInterval = null

// Priority levels with Morandi colors
const priorities = [
  { value: 'low', label: '低', color: '#D4C8BE' },
  { value: 'normal', label: '中', color: '#C8ADA0' },
  { value: 'high', label: '高', color: '#AD8A83' }
]

// Filtered wishes based on settings
const filteredWishes = computed(() => {
  if (showFulfilled.value) {
    return wishes.value
  } else {
    return wishes.value.filter(w => !w.fulfilled)
  }
})

// Load wishes
onMounted(() => {
  loadWishes()

  // Apply fade-in animation to modal
  const modalElement = document.querySelector('.modal')
  if (modalElement) {
    modalElement.style.animation = 'modalFadeIn 0.3s ease forwards'
  }
})

onUnmounted(() => {
  // Remove interval cleanup as it's no longer needed
})

// Methods
const loadWishes = () => {
  const savedWishes = localStorage.getItem('wishBullets')
  if (savedWishes) {
    wishes.value = JSON.parse(savedWishes)
  }
}

// 添加新的计算属性和状态
const containerSize = ref({ width: 800, height: 600 })
const positions = ref(new Map())

// 根据优先级决定wish大小
const getWishSize = (priority) => {
  // All wishes have same base size, only color differs
  return { width: 200, height: 120 }
}

// 检查位置是否有重叠
const hasOverlap = (x, y, width, height, excludeId) => {
  for (const [id, pos] of positions.value.entries()) {
    if (id === excludeId) continue

    const overlap = !(
      x + width < pos.x ||
      x > pos.x + pos.width ||
      y + height < pos.y ||
      y > pos.y + pos.height
    )

    if (overlap) return true
  }
  return false
}

// Add currentWishCount ref
const currentWishCount = ref(0)

// 查找位置的函数
const findPosition = (wish) => {
  const { width, height } = getWishSize(wish.priority)
  const containerWidth = containerSize.value.width
  const containerHeight = containerSize.value.height
  const padding = 20
  const maxCols = Math.floor((containerWidth - padding * 2) / (width + padding))

  const generatePosition = () => {
    const isEarlyWish = positions.value.size < 5
    const spreadFactor = isEarlyWish ? 0.3 : 0.7

    // Calculate center position
    const centerX = containerWidth / 2
    const centerY = containerHeight / 2

    // Random angle with preference for center area
    const angle = Math.random() * Math.PI * 2
    const maxRadius = Math.min(containerWidth / 3, containerHeight / 3) * spreadFactor
    const radius = Math.random() * maxRadius

    // Calculate position with slight offset from center
    let x = centerX + radius * Math.cos(angle) - width / 2
    let y = centerY + radius * Math.sin(angle) - height / 2

    // Add small random variation
    x += (Math.random() - 0.5) * 20
    y += (Math.random() - 0.5) * 20

    // Ensure within bounds
    x = Math.max(padding, Math.min(x, containerWidth - width - padding))
    y = Math.max(padding, Math.min(y, containerHeight - height - padding))

    return { x, y }
  }

  // Try to find non-overlapping position
  let attempts = 0
  const maxAttempts = 50

  while (attempts < maxAttempts) {
    const position = generatePosition()
    if (!hasOverlap(position.x, position.y, width, height, wish.id)) {
      return {
        x: position.x,
        y: position.y,
        width,
        height,
        rotation: (Math.random() - 0.5) * 8 // 减小旋转角度
      }
    }
    attempts++
  }

  // Fallback to grid position
  const col = currentWishCount.value % maxCols
  const row = Math.floor(currentWishCount.value / maxCols)

  currentWishCount.value++

  return {
    x: padding + col * (width + padding),
    y: padding + row * (height + padding),
    width,
    height,
    rotation: 0
  }
}

// 更新 bulletStyle 函数
const bulletStyle = (wish) => {
  if (!positions.value.has(wish.id)) {
    const pos = findPosition(wish)
    if (pos) {
      positions.value.set(wish.id, pos)
    }
  }

  const pos = positions.value.get(wish.id)
  if (!pos) return {}

  const isActive = activeWishId.value === wish.id
  let zIndex = 1

  // 设置基础 z-index
  if (wish.priority === 'high') {
    zIndex = 30
  } else if (wish.priority === 'normal') {
    zIndex = 20
  } else {
    zIndex = 10
  }

  // 如果是高优先级，确保不被其他愿望遮挡
  if (wish.priority === 'high' && !isActive) {
    zIndex = 40
  }

  return {
    position: 'absolute',
    left: `${pos.x}px`,
    top: `${pos.y}px`,
    width: `${pos.width}px`,
    height: `${pos.height}px`,
    transform: `rotate(${pos.rotation}deg)`,
    transition: 'all 0.3s ease',
    zIndex: isActive ? 100 : zIndex,
    // 添加悬停效果
    cursor: 'pointer',
  }
}

// 监听愿望变化
watch(() => filteredWishes.value, (newWishes) => {
  currentWishCount.value = 0
  positions.value.clear()
  newWishes.forEach(wish => {
    const pos = findPosition(wish)
    if (pos) {
      positions.value.set(wish.id, pos)
    }
  })
}, { deep: true })

// 添加容器大小更新逻辑
const updateContainerSize = () => {
  if (!wishContainer.value) return

  const container = wishContainer.value
  const containerRect = container.getBoundingClientRect()

  // Keep width within parent bounds
  const maxWidth = Math.min(1200, containerRect.width)

  containerSize.value = {
    width: maxWidth,
    height: Math.max(600, containerRect.height),
    expandable: false,
    centerX: maxWidth / 2,
    centerY: containerRect.height / 2
  }

  // Recalculate positions after size update
  positions.value.clear()
  filteredWishes.value.forEach(wish => {
    const pos = findPosition(wish)
    if (pos) {
      positions.value.set(wish.id, pos)
    }
  })
}

// 在组件挂载时初始化
onMounted(() => {
  console.log('Component mounted')
  loadWishes()
  updateContainerSize()
  currentWishCount.value = 0

  // 添加 resize 观察器
  const observer = new ResizeObserver(() => {
    console.log('Container resized')
    updateContainerSize()
    // 重新计算位置
    positions.value.clear()
    filteredWishes.value.forEach(wish => {
      const pos = findPosition(wish)
      if (pos) {
        positions.value.set(wish.id, pos)
      }
    })
  })

  if (wishContainer.value) {
    observer.observe(wishContainer.value)
  }

  return () => {
    observer.disconnect()
  }
})

const formatDate = (date) => {
  if (!date) return ''
  const d = new Date(date)
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
}

const generateId = () => {
  return Date.now() + Math.floor(Math.random() * 1000)
}

const submitWish = () => {
  if (!wishContent.value.trim()) return

  const wish = {
    id: generateId(),
    type: 'wish',
    content: wishContent.value,
    user: props.currentUser?.username || '匿名',
    userId: props.currentUser?.id || 'anonymous',
    date: new Date().toISOString(),
    fulfilled: false,
    priority: selectedPriority.value
  }

  wishes.value.push(wish)
  saveWishes()
  wishContent.value = ''
  selectedPriority.value = 'normal'
  showWishForm.value = false
}

const submitFulfill = () => {
  if (!selectedWish.value) return

  // Update the selected wish
  const wishIndex = wishes.value.findIndex(w => w.id === selectedWish.value.id)
  if (wishIndex !== -1) {
    wishes.value[wishIndex] = {
      ...wishes.value[wishIndex],
      fulfilled: true,
      fulfillContent: fulfillContent.value.trim(),
      fulfillDate: new Date().toISOString()
    }

    saveWishes()
    fulfillContent.value = ''
    showFulfillForm.value = false
    selectedWish.value = wishes.value[wishIndex] // Update the selected wish
  }
}

const saveWishes = () => {
  localStorage.setItem('wishBullets', JSON.stringify(wishes.value))
}

const handleWishClick = (wish) => {
  activeWishId.value = wish.id
  selectedWish.value = wish
}

const canDelete = (wish) => {
  return props.currentUser && wish.userId === props.currentUser.id
}

const canFulfill = (wish) => {
  return props.currentUser &&
    wish.userId === props.currentUser.id &&
    !wish.fulfilled &&
    wish.type === 'wish'
}

const deleteWish = (wish) => {
  wishes.value = wishes.value.filter(w => w.id !== wish.id)
  saveWishes()
  selectedWish.value = null
}

const openFulfillForm = () => {
  showFulfillForm.value = true
}

const cancelWish = () => {
  wishContent.value = ''
  selectedPriority.value = 'normal'
  showWishForm.value = false
}

const cancelFulfill = () => {
  fulfillContent.value = ''
  showFulfillForm.value = false
}

const close = () => {
  // Add animation when closing
  const modalElement = document.querySelector('.modal')
  if (modalElement) {
    // modalElement.style.animation = 'modalFadeOut 0.3s ease forwards'
    setTimeout(() => {
      emit('close')
    }, 300)
  } else {
    emit('close')
  }
}

// 添加激活状态跟踪
const activeWishId = ref(null)

// 添加优先级更新函数
const updatePriority = (wish, newPriority) => {
  const index = wishes.value.findIndex(w => w.id === wish.id)
  if (index !== -1) {
    wishes.value[index] = {
      ...wishes.value[index],
      priority: newPriority
    }
    saveWishes()
    selectedWish.value = wishes.value[index]
    // 重新计算位置
    positions.value.clear()
    filteredWishes.value.forEach(w => {
      const pos = findPosition(w)
      if (pos) {
        positions.value.set(w.id, pos)
      }
    })
  }
}

// 添加编辑权限检查
const canEdit = (wish) => {
  return props.currentUser && wish.userId === props.currentUser.id && !wish.fulfilled
}
</script>

<style scoped>
/* Animation keyframes */
@keyframes modalFadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes modalFadeOut {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

@keyframes wishPulse {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }

  100% {
    transform: scale(1);
  }
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: none;
  z-index: 1050;
  opacity: 0;
}

.modal.show {
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
}

.modal-dialog {
  transform: scale(0.95);
  transition: transform 0.3s ease;
  width: 90%;
  max-width: 800px;
}

.modal.show .modal-dialog {
  transform: scale(1);
}

.modal-content {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  border: none;
}

.modal-header {
  background: #C9A9A6;
  color: white;
  border-bottom: none;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: center;
}

.modal-title {
  font-weight: bold;
  font-size: 1.4rem;
  margin: 0;
}

.controls-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* padding: 0 1rem; */
  padding-top: 1%;
  padding-bottom: 1%;
}

.wish-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 4px;
}

.filter-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.filter-label {
  font-size: 0.9rem;
  color: #8E7F7B;
}

/* Switch Toggle */
.switch {
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #D9CDC4;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .4s;
}

input:checked+.slider {
  background-color: #AB8E83;
}

input:checked+.slider:before {
  transform: translateX(24px);
}

.slider.round {
  border-radius: 24px;
}

.slider.round:before {
  border-radius: 50%;
}

.wish-container {
  height: 60vh;
  overflow: auto;
  position: relative;
  background: #F5F2F0;
  border-radius: 12px;
  padding: 20px;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.wish-bullet {
  position: absolute;
  padding: 12px;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease, z-index 0s;
  /* 修改过渡效果 */
  cursor: pointer;
  display: flex;
  flex-direction: column;
  width: min(200px, calc(100% - 30px));
  min-height: 100px;
  z-index: 1;
}

/* 优先级顺序：hover < priority < active */
.wish-bullet.high {
  z-index: 3;
}

.wish-bullet.normal {
  z-index: 2;
}

.wish-bullet.low {
  z-index: 1;
}

/* hover状态 - 需要比普通优先级高 */
.wish-bullet:hover {
  transform: scale(1.02);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.12);
  z-index: 99 !important;
  /* 使用 !important 确保优先级 */
}

/* 激活状态 - 最高优先级 */
.wish-bullet[data-active="true"] {
  z-index: 100 !important;
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.wish-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 8px;
  background: inherit;
  /* Remove backdrop-filter */
  border-radius: 6px;
}

@keyframes wishAppear {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes newWishAppear {
  0% {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
  }

  50% {
    opacity: 1;
    transform: scale(1.1) translateY(0);
  }

  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* 添加容器扩展动画 */
.wish-container[data-expandable="true"] {
  animation: containerExpand 0.3s ease forwards;
}

@keyframes containerExpand {
  from {
    transform: scale(0.98);
  }

  to {
    transform: scale(1);
  }
}

.wish-bullet.wish {
  background: #EBE2DF;
  color: #8E6E68;
  border-left: 3px solid #C9A9A6;
}

.wish-bullet.fulfill {
  background: #E2DED9;
  color: #8E7F7B;
  border-left: 3px solid #AB8E83;
}

.wish-bullet.fulfilled {
  background: #E8E4E1;
  color: #A19994;
  border-left: 3px solid #B5A9A4;
}

/* Priority styles */
.wish-bullet.low {
  border-color: #D4C8BE;
}

.wish-bullet.normal {
  border-color: #C8ADA0;
}

.wish-bullet.high {
  border-color: #AD8A83;
  /* animation: scroll 30s linear; */
}

.wish-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #AD8A83;
  color: white;
  border-radius: 12px;
  padding: 3px 8px;
  font-size: 0.7rem;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.wish-content {
  font-size: 1.1em;
  margin-bottom: 8px;
  line-height: 1.4;
}

.wish-info {
  font-size: 0.8em;
  opacity: 0.8;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  padding-top: 5px;
  margin-top: 5px;
}

.modal-form {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1060;
  /* animation: modalFadeIn 0.3s ease; */
}

.form-content {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  /* animation: modalContentIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); */
}

.form-content h3 {
  margin-bottom: 1.5rem;
  color: #8E6E68;
  text-align: center;
  font-weight: bold;
}

.form-control {
  border-radius: 8px;
  resize: none;
  border: 1px solid #E2DED9;
  transition: border-color 0.3s;
  font-size: 1.1rem;
  background-color: #F5F2F0;
}

.form-control:focus {
  border-color: #C9A9A6;
  box-shadow: 0 0 0 0.2rem rgba(201, 169, 166, 0.25);
}

.char-count {
  text-align: right;
  color: #8E7F7B;
  font-size: 0.9em;
  margin-bottom: 1rem;
}

.form-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.btn {
  padding: 0.5rem 0.5rem;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s;
}

.btn-primary {
  background: #C9A9A6;
  border: none;
}

.btn-primary:hover {
  background: #B9918C;
  transform: translateY(-2px);
}

.btn-success {
  background: #AB8E83;
  border: none;
}

.btn-success:hover {
  background: #97776C;
  transform: translateY(-2px);
}

.btn-secondary {
  background: #F5F2F0;
  color: #8E6E68;
  border: 1px solid #E2DED9;
}

.btn-secondary:hover {
  background: #E8E4E1;
}

.btn-danger {
  background: #C68882;
  border: none;
}

.btn-danger:hover {
  background: #B67873;
}

/* Priority selector */
.priority-selector {
  display: flex;
  gap: 10px;
  margin-top: 8px;
}

.priority-option {
  flex: 1;
  text-align: center;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  color: #333;
  border: 2px solid transparent;
}

.priority-option:hover {
  transform: translateY(-2px);
}

.priority-option.active {
  border-color: #8E6E68;
  font-weight: bold;
}

/* Wish detail */
.wish-detail {
  background: #F5F2F0;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
}

.wish-detail-content {
  font-size: 1.2em;
  margin-bottom: 15px;
  line-height: 1.4;
  color: #8E6E68;
}

.fulfill-content {
  background: rgba(171, 142, 131, 0.1);
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
}

.wish-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.85em;
  color: #8E7F7B;
  border-top: 1px solid #E2DED9;
  padding-top: 10px;
}

.fulfill-date {
  font-weight: bold;
  color: #AB8E83;
}

.original-wish {
  background: #F5F2F0;
  padding: 15px;
  border-radius: 8px;
  border-left: 3px solid #C9A9A6;
}

.original-wish h5 {
  color: #8E7F7B;
  font-size: 0.9em;
  margin-bottom: 5px;
}

.original-wish p {
  font-size: 1.1em;
  margin-bottom: 0;
  color: #8E6E68;
}

@keyframes modalContentIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

.wish-wall-container {
  position: relative;
  height: calc(80vh - 120px);
  min-height: 400px;
  width: 100%;
  /* Full width */
  max-width: 1200px;
  /* Maximum width */
  margin: 0 auto;
  /* Center container */
  overflow-y: scroll;
  padding: 0 20px;
  /* Add padding for smaller screens */
}

.wish-container {
  position: relative;
  width: 100%;
  height: 100%;
  padding: auto;
  background: #F5F2F0;
  overflow-y: auto;
  margin: 0 auto;
}

.wish-bullet {
  position: absolute;
  padding: 12px;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease, z-index 0s;
  /* 修改过渡效果 */
  cursor: pointer;
  display: flex;
  flex-direction: column;
  width: min(200px, calc(100% - 30px));
  min-height: 100px;
  z-index: 1;
}

/* 优先级顺序：hover < priority < active */
.wish-bullet.high {
  z-index: 3;
}

.wish-bullet.normal {
  z-index: 2;
}

.wish-bullet.low {
  z-index: 1;
}

/* hover状态 - 需要比普通优先级高 */
.wish-bullet:hover {
  transform: scale(1.02);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.12);
  z-index: 100 !important;
  /* 使用 !important 确保优先级 */
}

/* 激活状态 - 最高优先级 */
.wish-bullet[data-active="true"] {
  z-index: 100 !important;
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.wish-text {
  flex: 1;
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.4;
  overflow-wrap: break-word;
  word-break: break-all;
  display: -webkit-box;
  -line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.wish-footer {
  margin-top: auto;
  padding-top: 8px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
}

@media (max-width: 768px) {
  .wish-bullet {
    width: 160px;
    /* Smaller on mobile */
    min-height: 100px;
  }

  .wish-text {
    font-size: 0.9rem;
  }

  .wish-footer {
    font-size: 0.75rem;
  }
}

@media (max-width: 768px) {
  .content {
    transform: scale(0.9);
    /* 按比例缩放 */
    transform-origin: left top;
    /* 缩放基准点 */
  }
}

@media (max-width: 480px) {
  .content {
    transform: scale(0.8);
    /* 更小的屏幕上进一步缩放 */
    transform-origin: left top;
    /* 缩放基准点 */
  }
}

/* Update container styles */
.modal-dialog {
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
  height: 100%;
  padding: 15px;
}

.modal-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.wish-wall-container {
  position: relative;
  flex: 1;
  width: 100%;
  overflow: hidden;
  padding: 10px;
}

.wish-container {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 400px;
  background: #F5F2F0;
  border-radius: 12px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 15px;
}

/* Update wish bullet styles */
.wish-bullet {
  position: absolute;
  width: min(200px, calc(100% - 30px));
  /* Responsive width */
  min-height: 100px;
  padding: 12px;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease, z-index 0s;
  /* 修改过渡效果 */
}

.wish-text {
  font-size: 0.9rem;
  line-height: 1.4;
  overflow-wrap: break-word;
  word-break: break-word;
  /* Changed from break-all */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .modal-dialog {
    padding: 10px;
  }

  .wish-bullet {
    width: calc(100% - 20px);
    max-width: 180px;
    min-height: 90px;
    font-size: 0.9rem;
  }

  .wish-text {
    font-size: 0.85rem;
    -webkit-line-clamp: 2;
  }

  .wish-footer {
    font-size: 0.75rem;
    padding-top: 6px;
  }

  .controls-container {
    flex-direction: column;
    gap: 10px;
  }

  .wish-controls {
    flex-wrap: wrap;
    gap: 10px;
  }
}

/* Small mobile screens */
@media (max-width: 480px) {
  .modal-dialog {
    padding: 5px;
  }

  .wish-bullet {
    width: calc(100% - 10px);
    max-width: 160px;
    min-height: 80px;
  }

  .wish-text {
    font-size: 0.8rem;
  }
}

/* 更新容器样式确保完整显示 */
.wish-wall-container {
  position: relative;
  height: calc(90vh - 180px);
  /* 调整高度计算 */
  min-height: 400px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}

.wish-container {
  position: relative;
  width: 100%;
  height: 100%;
  background: #F5F2F0;
  border-radius: 12px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 20px;
}

/* 添加优先级编辑样式 */
.priority-edit {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.priority-edit .form-label {
  display: block;
  margin-bottom: 8px;
  color: #8E7F7B;
}
</style>

<!-- claude changed v2.0 -->