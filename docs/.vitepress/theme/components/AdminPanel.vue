<template>
    <div class="admin-container">
      <!-- 登录界面 -->
      <div v-if="!isLoggedIn" class="admin-login">
        <h2>管理员登录</h2>
        <input v-model="adminEmail" placeholder="邮箱" class="form-control mb-3">
        <input v-model="adminPassword" type="password" placeholder="密码" class="form-control mb-3">
        <button @click="handleAdminLogin" class="btn btn-primary w-100">登录</button>
      </div>
  
      <!-- 管理面板 -->
      <div v-else class="admin-panel">
        <div class="d-flex justify-content-end mb-4">
          <button @click="logout" class="btn btn-danger">退出登录</button>
        </div>
  
        <div class="row">
          <!-- 用户管理 -->
          <div class="col-md-4 mb-4">
            <div class="card">
              <div class="card-header bg-primary text-white">用户管理</div>
              <div class="card-body">
                <table class="table">
                  <thead>
                    <tr>
                      <th>用户名</th>
                      <th>邮箱</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="user in users" :key="user.email">
                      <td>{{ user.username }}</td>
                      <td>{{ user.email }}</td>
                      <td>
                        <button v-if="!user.isAdmin" 
                                @click="deleteUser(user.email)"
                                class="btn btn-sm btn-danger">
                          删除
                        </button>
                        <span v-else class="badge bg-primary">管理员</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
  
          <!-- 自习室管理 -->
          <div class="col-md-4 mb-4">
            <div class="card">
              <div class="card-header bg-success text-white">自习室管理</div>
              <div class="card-body">
                <table class="table">
                  <thead>
                    <tr>
                      <th>名称</th>
                      <th>人数</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(users, room) in roomStats" :key="room">
                      <td>{{ room }}</td>
                      <td>{{ Object.keys(users).length }}</td>
                      <td>
                        <button @click="viewRoomUsers(room)" 
                                class="btn btn-sm btn-info me-2">
                          查看
                        </button>
                        <button @click="deleteRoom(room)" 
                                class="btn btn-sm btn-danger">
                          删除
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
  
          <!-- 许愿墙管理 -->
          <div class="col-md-4 mb-4">
            <div class="card">
              <div class="card-header bg-warning text-dark">愿望管理</div>
              <div class="card-body">
                <table class="table">
                  <thead>
                    <tr>
                      <th>内容</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(wish, index) in wishBullets" :key="index">
                      <td>{{ wish.content }}</td>
                      <td>
                        <button @click="deleteWish(index)" 
                                class="btn btn-sm btn-danger">
                          删除
                        </button>
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
  </template>
  
  <script>
  export default {
    data() {
      return {
        isLoggedIn: false,
        adminEmail: '6657@qq.com',
        adminPassword: '12345',
        users: [],
        roomStats: {},
        wishBullets: []
      }
    },
    mounted() {
      this.initializeAdmin()
      this.checkLoginStatus()
    },
    methods: {
      initializeAdmin() {
        const users = JSON.parse(localStorage.getItem('users') || '[]')
        if (!users.find(u => u.email === this.adminEmail)) {
          users.push({
            username: 'admin',
            email: this.adminEmail,
            password: this.adminPassword,
            isAdmin: true
          })
          localStorage.setItem('users', JSON.stringify(users))
        }
      },
      checkLoginStatus() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'))
        this.isLoggedIn = currentUser?.isAdmin || false
        if (this.isLoggedIn) this.loadAllData()
      },
      async loadAllData() {
        this.users = JSON.parse(localStorage.getItem('users') || '[]')
        this.roomStats = JSON.parse(localStorage.getItem('roomStats') || '{}')
        this.wishBullets = JSON.parse(localStorage.getItem('wishBullets') || '[]')
      },
      async handleAdminLogin() {
        const users = JSON.parse(localStorage.getItem('users') || '[]')
        const admin = users.find(u => 
          u.email === this.adminEmail && 
          u.password === this.adminPassword &&
          u.isAdmin
        )
        
        if (admin) {
          localStorage.setItem('currentUser', JSON.stringify(admin))
          this.isLoggedIn = true
          await this.loadAllData()
        } else {
          alert('管理员邮箱或密码错误')
        }
      },
      logout() {
        localStorage.removeItem('currentUser')
        this.isLoggedIn = false
      },
      deleteUser(email) {
        if (confirm('确定要删除该用户吗？')) {
          this.users = this.users.filter(u => u.email !== email)
          localStorage.setItem('users', JSON.stringify(this.users))
        }
      },
      deleteRoom(room) {
        if (confirm('确定要删除该自习室吗？')) {
          delete this.roomStats[room]
          localStorage.setItem('roomStats', JSON.stringify(this.roomStats))
        }
      },
      deleteWish(index) {
        if (confirm('确定要删除该愿望吗？')) {
          this.wishBullets.splice(index, 1)
          localStorage.setItem('wishBullets', JSON.stringify(this.wishBullets))
        }
      },
      viewRoomUsers(room) {
        const users = Object.keys(this.roomStats[room] || {})
        alert(`${room} 的成员：\n${users.join('\n') || '暂无成员'}`)
      }
    }
  }
  </script>
  
  <style scoped>
  .admin-login {
    max-width: 400px;
    margin: 2rem auto;
    padding: 2rem;
    background: var(--vp-c-bg-soft);
    border-radius: 8px;
  }
  
  .admin-panel {
    background: var(--vp-c-bg);
    padding: 2rem;
    border-radius: 8px;
  }
  
  .card {
    margin-bottom: 1rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  
  .table {
    font-size: 0.9rem;
  }
  
  .btn-sm {
    padding: 0.25rem 0.5rem;
    font-size: 0.8rem;
  }
  </style>
  