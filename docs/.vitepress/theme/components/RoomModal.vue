<template>
  <div class="modal" :class="{ show }" tabindex="-1" v-show="show" @click.self="close">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            <i class="fas fa-users-classroom me-2"></i>
            自习室
          </h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body">
          <!-- 未登录状态 -->
          <div v-if="!currentUser" class="auth-prompt">
            <div class="prompt-card">
              <i class="fas fa-door-open fa-3x text-primary mb-3"></i>
              <h4 class="mb-3">加入学习社区</h4>
              <button class="btn btn-lg btn-primary" @click="$emit('showLogin')">
                <i class="fas fa-sign-in-alt me-2"></i>立即登录
              </button>
            </div>
          </div>

          <!-- 已登录状态 -->
          <div v-else class="room-interface">
            <!-- 控制区域 -->
            <div class="control-panel">
              <div class="room-status">
                <template v-if="currentUser.room">
                  <div class="current-room">
                    <i class="fas fa-school me-2"></i>
                    当前自习室：{{ currentUser.room }}
                  </div>
                  <button class="btn btn-danger" @click="leaveRoom">
                    <i class="fas fa-sign-out-alt me-2"></i>退出
                  </button>
                </template>
                <template v-else>
                  <div class="btn-group">
                    <button class="btn btn-primary btn-join" @click="joinRoom">
                      <i class="fas fa-door-open me-2"></i>加入自习室
                    </button>
                    <button class="btn btn-success btn-create" @click="createRoom">
                      <i class="fas fa-plus-circle me-2"></i>新建自习室
                    </button>
                  </div>
                </template>
              </div>
            </div>

            <!-- 自习室列表 -->
            <div class="room-list">
              <h3 class="section-title">
                <div class="title-left">
                  <i class="fas fa-list-ol me-2"></i>
                  自习室列表
                </div>
                <!-- 转移房主模态框 -->
                <div v-if="showTransferModal" class="modal transfer-modal" @click.self="showTransferModal = false">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">转移房主</h5>
                        <button type="button" class="btn-close" @click="showTransferModal = false"></button>
                      </div>
                      <div class="modal-body">
                        <div class="form-group">
                          <label>选择新房主：</label>
                          <select v-model="selectedNewOwner" class="form-select">
                            <option value="">请选择</option>
                            <option v-for="member in availableMembers" :key="member" :value="member">
                              {{ member }}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button class="btn btn-secondary" @click="showTransferModal = false">取消</button>
                        <button class="btn btn-primary" @click="handleTransferOwner">确认转移</button>
                      </div>
                    </div>
                  </div>
                </div>
              </h3>
              <div class="room-grid">
                <div v-for="(room, roomName) in roomStats" :key="roomName" class="room-card"
                  :class="{ 'current-room': currentUser.room === roomName }">
                  <div class="room-header">
                    <i class="fas fa-university me-2"></i>
                    <h4>{{ roomName }}</h4>
                    <span v-if="getRoomOwner(roomName)" class="owner-tag">
                      {{ getRoomOwner(roomName) === currentUser.username ? '(我是房主)' : `(房主: ${getRoomOwner(roomName)})`
                      }}
                    </span>
                  </div>
                  <div class="room-meta">
                    <span class="member-count">
                      <i class="fas fa-users me-1"></i>
                      {{ Object.keys(room.members).length }}人
                    </span>
                    <div class="room-actions">
                      <template v-if="currentUser.room === roomName && getRoomOwner(roomName) === currentUser.username">
                        <button class="btn btn-sm btn-warning" @click="openTransferModal(roomName)">
                          <i class="fas fa-exchange-alt me-1"></i>转让
                        </button>
                        <button class="btn btn-sm btn-danger" @click="deleteRoom(roomName)">
                          <i class="fas fa-trash-alt me-1"></i>解散
                        </button>
                      </template>
                      <button v-else-if="currentUser.room !== roomName" class="btn btn-sm btn-join"
                        @click="handleJoin(roomName)">
                        加入
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 当前房间排名 -->
            <div v-if="currentUser.room" class="ranking-section">
              <h3 class="section-title">
                <i class="fas fa-trophy me-2"></i>
                {{ currentUser.room }} 学习榜
              </h3>
              <div class="ranking-list">
                <div v-for="([username, minutes], index) in sortedRoomMembers" :key="username" class="ranking-item">
                  <div class="rank">
                    <span class="rank-badge" :class="getRankClass(index)">
                      {{ index + 1 }}
                    </span>
                  </div>
                  <div class="user-info">
                    <span class="username">{{ username }}</span>
                    <span class="study-time">
                      {{ Math.floor(minutes / 60) }}小时{{ minutes % 60 }}分钟
                    </span>
                  </div>
                  <div class="progress">
                    <div class="progress-bar" :style="{ width: getProgressWidth(minutes) }"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';

export default {
  props: {
    show: Boolean,
    currentUser: Object
  },
  emits: ['close', 'showLogin', 'update:currentUser'],
  setup(props, { emit }) {
    console.log('RoomModal setup, props:', props);

    const close = () => {
      console.log('RoomModal close called');
      emit('close');
    };

    onMounted(() => {
      console.log('RoomModal mounted');
      loadRoomStats();
    });

    const loadRoomStats = () => {
      console.log('Loading room stats');
      try {
        const stats = JSON.parse(localStorage.getItem('roomStats') || '{}');
        console.log('Loaded room stats:', stats);
        roomStats.value = stats;
      } catch (e) {
        console.error('Error loading room stats:', e);
        roomStats.value = {};
      }
    };

    watch(() => props.show, (newVal) => {
      console.log('RoomModal show prop changed:', newVal);
      if (newVal) {
        loadRoomStats();
      }
    });

    const roomStats = ref({});

    const sortedRoomMembers = computed(() => {
      if (!props.currentUser?.room || !roomStats.value[props.currentUser.room]) return [];
      return Object.entries(roomStats.value[props.currentUser.room].members)
        .sort(([, a], [, b]) => b - a)
        .map(([name, minutes]) => [name, isNaN(minutes) ? 0 : minutes]); // 处理NaN
    });

    const getRankClass = (index) => {
      if (index === 0) return 'gold';
      if (index === 1) return 'silver';
      if (index === 2) return 'bronze';
      return '';
    };

    const getProgressWidth = (minutes) => {
      const maxMinutes = Math.max(...sortedRoomMembers.value.map(([, m]) => m));
      return `${(minutes / maxMinutes) * 100}%`;
    };

    const joinRoom = () => {
      const roomName = prompt('请输入要加入的自习室名称:');
      if (!roomName) return;

      if (!roomStats.value[roomName]) {
        alert('该自习室不存在');
        return;
      }

      props.currentUser.room = roomName;
      localStorage.setItem('currentUser', JSON.stringify(props.currentUser));

      if (!roomStats.value[roomName].members[props.currentUser.username]) {
        roomStats.value[roomName].members[props.currentUser.username] = 0;
      }
      localStorage.setItem('roomStats', JSON.stringify(roomStats.value));

      loadRoomStats();
      alert('成功加入自习室！');
    };

    const createRoom = () => {
      const roomName = prompt('请输入新自习室名称:');
      if (!roomName) return;

      if (roomStats.value[roomName]) {
        alert('该自习室已存在');
        return;
      }

      roomStats.value[roomName] = {
        owner: props.currentUser.username, // 添加创建者信息
        members: {
          [props.currentUser.username]: 0
        }
      };
      localStorage.setItem('roomStats', JSON.stringify(roomStats.value));

      props.currentUser.room = roomName;
      localStorage.setItem('currentUser', JSON.stringify(props.currentUser));

      loadRoomStats();
      alert('成功创建并加入自习室！');
    };

    const leaveRoom = async () => {
      const roomName = props.currentUser.room;
      const roomMembers = Object.keys(roomStats.value[roomName].members);

      if (roomMembers.length === 1) {
        const confirm = window.confirm('你是自习室最后一名成员，退出后自习室将被删除。是否确认退出？');
        if (!confirm) return;

        delete roomStats.value[roomName];
      } else {
        delete roomStats.value[roomName].members[props.currentUser.username];

        // 如果是房主退出，转移房主给第一个成员
        if (getRoomOwner(roomName) === props.currentUser.username) {
          const newOwner = Object.keys(roomStats.value[roomName].members)[0];
          roomStats.value[roomName].owner = newOwner;
          alert(`房主身份已转移给 ${newOwner}`);
        }
      }

      localStorage.setItem('roomStats', JSON.stringify(roomStats.value));

      const updatedUser = { ...props.currentUser };
      delete updatedUser.room;
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      emit('update:currentUser', updatedUser);

      loadRoomStats();
      alert('已退出自习室！');
    };

    const handleJoin = (roomName) => {
      props.currentUser.room = roomName;
      localStorage.setItem('currentUser', JSON.stringify(props.currentUser));

      if (!roomStats.value[roomName].members[props.currentUser.username]) {
        roomStats.value[roomName].members[props.currentUser.username] = 0;
      }
      localStorage.setItem('roomStats', JSON.stringify(roomStats.value));

      loadRoomStats();
      alert('成功加入自习室！');
    };

    const deleteRoom = (roomName) => {
      if (getRoomOwner(roomName) !== props.currentUser.username) {
        alert('只有房主可以删除自习室！');
        return;
      }

      const confirm = window.confirm('确定要删除该自习室吗？所有成员将被移出。');
      if (!confirm) return;

      // 通知所有成员房间被删除
      Object.keys(roomStats.value[roomName].members).forEach(member => {
        if (member !== props.currentUser.username) {
          // 这里可以添加实时通知功能
          console.log(`通知 ${member}: 自习室 ${roomName} 已被房主删除`);
        }
      });

      delete roomStats.value[roomName];
      localStorage.setItem('roomStats', JSON.stringify(roomStats.value));

      const updatedUser = { ...props.currentUser };
      delete updatedUser.room;
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      emit('update:currentUser', updatedUser);

      loadRoomStats();
      alert('自习室已删除！');
    };

    const showTransferOwner = (roomName) => {
      const members = Object.keys(roomStats.value[roomName].members)
        .filter(m => m !== props.currentUser.username);

      if (members.length === 0) {
        alert('没有其他成员可以转让房主身份');
        return;
      }

      const newOwner = prompt('请输入要转让的成员用户名：\n可选成员：' + members.join(', '));
      if (!newOwner) return;

      if (!members.includes(newOwner)) {
        alert('该用户不在自习室中！');
        return;
      }

      roomStats.value[roomName].owner = newOwner;
      localStorage.setItem('roomStats', JSON.stringify(roomStats.value));
      alert(`已将房主身份转让给 ${newOwner}`);
      loadRoomStats();
    };

    const getRoomOwner = (roomName) => {
      return roomStats.value[roomName]?.owner || '';
    };

    const showTransferModal = ref(false);
    const selectedNewOwner = ref('');
    const currentRoomForTransfer = ref('');

    const availableMembers = computed(() => {
      if (!currentRoomForTransfer.value || !roomStats.value[currentRoomForTransfer.value]) return [];
      return Object.keys(roomStats.value[currentRoomForTransfer.value].members)
        .filter(m => m !== props.currentUser.username);
    });

    const openTransferModal = (roomName) => {
      currentRoomForTransfer.value = roomName;
      selectedNewOwner.value = '';
      showTransferModal.value = true;
    };

    const handleTransferOwner = () => {
      if (!selectedNewOwner.value) {
        alert('请选择新房主');
        return;
      }

      const roomName = currentRoomForTransfer.value;
      roomStats.value[roomName].owner = selectedNewOwner.value;
      localStorage.setItem('roomStats', JSON.stringify(roomStats.value));

      alert(`已将房主身份转让给 ${selectedNewOwner.value}`);
      showTransferModal.value = false;
      loadRoomStats();
    };

    return {
      roomStats,
      sortedRoomMembers,
      getRankClass,
      getProgressWidth,
      joinRoom,
      createRoom,
      leaveRoom,
      handleJoin,
      deleteRoom,
      showTransferOwner,
      getRoomOwner,
      close, // 添加close方法到返回值
      showTransferModal,
      selectedNewOwner,
      availableMembers,
      openTransferModal,
      handleTransferOwner,
    };
  }
};
</script>

<style scoped>
.modal-content {
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

}

.modal-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.modal-header {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border-bottom: none;
  padding: 1.5rem;
}

.auth-prompt {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
}

.prompt-card {
  text-align: center;
  padding: 2rem;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.control-panel {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
}

.room-status {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.current-room {
  font-size: 1.1rem;
  color: #4a5568;
  display: flex;
  align-items: center;
}

.btn-group {
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
}

.btn-success {
  background: linear-gradient(135deg, #48bb78, #38a169);
  border: none;
}

.btn-danger {
  background: linear-gradient(135deg, #f56565, #e53e3e);
  border: none;
}

.room-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.room-card {
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.room-card:hover {
  transform: translateY(-5px);
}

.room-header {
  display: flex;
  align-items: center;
  /* gap: 1rem; */
  padding: 0.5rem;
}

.room-header h4 {
  margin: 0;
  color: #2d3748;
}

.room-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.member-count {
  color: #718096;
  display: flex;
  align-items: center;
  padding: 0.5rem;
}

.ranking-section {
  margin-top: 0.5rem;
  background: #fff;
  border-radius: 12px;
  padding: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.ranking-list {
  margin-top: 1.5rem;
}

.ranking-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.rank-badge {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
}

.rank-badge.gold {
  background: #f6e05e
}

.rank-badge.silver {
  background: #cbd5e0
}

.rank-badge.bronze {
  background: #ed8936
}

.user-info {
  flex: 1;
  margin: 0 1.5rem;
}

.username {
  font-weight: 500;
  color: #2d3748;
}

.study-time {
  color: #718096;
  font-size: 0.9rem;
}

.progress {
  width: 200px;
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  transition: width 0.5s ease;
}

.section-title {
  color: #2d3748;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
}

.owner-badge {
  font-size: 0.8em;
  color: #ba4949;
  margin-left: 4px;
}

.room-actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.owner-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-warning {
  background: linear-gradient(135deg, #f6ad55, #ed8936);
  border: none;
  color: white;
}

.owner-tag {
  font-size: 0.75rem;
  color: #ba4949;
  padding: 2px 6px;
  background-color: rgba(186, 73, 73, 0.1);
  border-radius: 4px;
  margin-left: auto;
}

.transfer-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1060;
}

.transfer-modal .modal-dialog {
  width: 100%;
  max-width: 400px;
  margin: 1.75rem auto;
}

.form-select {
  width: 100%;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  margin-top: 0.5rem;
}
</style>