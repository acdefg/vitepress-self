<template>
  <div class="modal fade" :class="{ show: show }" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">账户管理</h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body">
          <form v-if="activeTab === 'login'" @submit.prevent="handleLogin">
            <div class="mb-3">
              <label class="form-label">邮箱</label>
              <input v-model="loginForm.email" type="email" class="form-control" required>
            </div>
            <div class="mb-3">
              <label class="form-label">密码</label>
              <input v-model="loginForm.password" type="password" class="form-control" required>
            </div>
            <div v-if="loginError" class="alert alert-danger">{{ loginError }}</div>
          </form>

          <form v-else @submit.prevent="handleRegister">
            <div class="mb-3">
              <label class="form-label">用户名</label>
              <input v-model="registerForm.username" class="form-control" required>
            </div>
            <div class="mb-3">
              <label class="form-label">邮箱</label>
              <input v-model="registerForm.email" type="email" class="form-control" required>
            </div>
            <div class="mb-3">
              <label class="form-label">密码</label>
              <input v-model="registerForm.password" type="password" class="form-control" required>
            </div>
            <div v-if="registerError" class="alert alert-danger">{{ registerError }}</div>
          </form>

          <div class="btn-group w-100">
            <button class="btn btn-primary" @click="handleButtonClick">
              {{ activeTab === 'login' ? '登录' : '注册' }}
            </button>
            <button class="btn btn-secondary" @click="toggleTab">
              切换到{{ activeTab === 'login' ? '注册' : '登录' }}
            </button>
          </div>
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
  emits: ['close', 'login-success'],
  data() {
    return {
      activeTab: 'login',
      loginForm: { email: '', password: '' },
      registerForm: { username: '', email: '', password: '' },
      loginError: '',
      registerError: ''
    }
  },
  watch: {
    show(newVal) {
      if (newVal) {
        // Reset forms when modal opens
        this.loginForm = { email: '', password: '' }
        this.registerForm = { username: '', email: '', password: '' }
        this.loginError = ''
        this.registerError = ''
        this.activeTab = 'login'
      }
    }
  },
  methods: {
    async handleLogin() {
      console.log('Attempting login with:', this.loginForm)
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      console.log('Found users:', users)

      const user = users.find(u =>
        u.email === this.loginForm.email &&
        u.password === this.loginForm.password
      )

      console.log('Found user:', user)

      if (user) {
        console.log('Login successful')
        localStorage.setItem('currentUser', JSON.stringify(user))
        this.$emit('login-success', user)
        this.$emit('close')
        // Clear form
        this.loginForm = { email: '', password: '' }
        this.loginError = ''
      } else {
        console.log('Login failed')
        this.loginError = '邮箱或密码错误'
      }
    },

    async handleRegister() {
      console.log('Attempting registration with:', this.registerForm)

      // Validate inputs
      if (!this.registerForm.username || !this.registerForm.email || !this.registerForm.password) {
        this.registerError = '所有字段都必须填写'
        console.log('Registration failed: Missing fields')
        return
      }

      if (this.registerForm.password.length < 6) {
        this.registerError = '密码长度至少6位'
        console.log('Registration failed: Password too short')
        return
      }

      if (this.checkEmailExists(this.registerForm.email)) {
        this.registerError = '邮箱已被注册'
        console.log('Registration failed: Email exists')
        return
      }

      const newUser = {
        ...this.registerForm,
        id: Date.now(),
        createdAt: new Date().toISOString()
      }

      console.log('Creating new user:', newUser)

      try {
        const users = JSON.parse(localStorage.getItem('users') || '[]')
        users.push(newUser)
        localStorage.setItem('users', JSON.stringify(users))
        console.log('User registered successfully')

        // Auto login after registration
        localStorage.setItem('currentUser', JSON.stringify(newUser))
        this.$emit('login-success', newUser)
        this.$emit('close')

        // Clear form
        this.registerForm = { username: '', email: '', password: '' }
        this.registerError = ''
      } catch (error) {
        console.error('Registration error:', error)
        this.registerError = '注册失败，请重试'
      }
    },

    checkEmailExists(email) {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const exists = users.some(u => u.email === email)
      console.log('Checking email exists:', email, exists)
      return exists
    },

    handleButtonClick() {
      if (this.activeTab === 'login') {
        this.handleLogin()
      } else {
        this.handleRegister()
      }
    },

    toggleTab() {
      this.activeTab = this.activeTab === 'login' ? 'register' : 'login'
    }
  }
}
</script>

<style>
.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1050;
}

.modal.show {
  display: flex !important;
  align-items: center;
  justify-content: center;
}

.modal-dialog {
  max-width: 500px;
  margin: 1.75rem auto;
  width: 90%;
}

.modal-content {
  position: relative;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
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
}

.modal-body {
  padding: 1rem;
}

.nav-pills {
  margin-bottom: 1.5rem !important;
}

.nav-link {
  color: #6c757d;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
}

.nav-link.active {
  color: #fff;
  background-color: #ba4949;
}

.form-control {
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border: 1px solid #ced4da;
  border-radius: 0.375rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.btn-primary {
  color: #fff;
  background-color: #ba4949;
  border-color: #ba4949;
}

.btn-secondary {
  color: #fff;
  background-color: #6c757d;
  border-color: #6c757d;
}

.btn-primary:hover {
  background-color: #a13e3e;
  border-color: #973a3a;
}

.btn-secondary:hover {
  background-color: #5a6268;
  border-color: #545b62;
}

.alert {
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.375rem;
}

.alert-danger {
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
}

.toggle-link {
  color: #6c757d;
  text-decoration: none;
}

.toggle-link:hover {
  color: #ba4949;
}

.btn-group {
  display: flex;
  gap: 10px;
}

.btn-group .btn {
  flex: 1;
}
</style>