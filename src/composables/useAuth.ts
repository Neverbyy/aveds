import { ref, computed, type Ref } from 'vue'
import type { Router } from 'vue-router'

export type AuthUser = { 
  login: string; 
  name: string 
}

const isAuthModalOpen = ref<boolean>(false)
const authError = ref<string>('')
const currentUser = ref<AuthUser | null>(null)
const isLoggedIn = computed<boolean>(() => !!currentUser.value)

export const useAuth = () => {
  const openAuthModal = (): void => {
    authError.value = ''
    isAuthModalOpen.value = true
  }

  const closeAuthModal = (): void => {
    isAuthModalOpen.value = false
  }

  const initializeFromStorage = (): void => {
    const raw = localStorage.getItem('currentUser')
    currentUser.value = raw ? (JSON.parse(raw) as AuthUser) : null
  }

  const login = async (payload: { login: string; password: string }): Promise<boolean> => {
    try {
      const res = await fetch(`${import.meta.env.BASE_URL}users.json`)

      const users = (await res.json()) as Array<{ 
        login: string; 
        password: string; 
        name: string 
      }>

      const found = users.find(
        (u) => u.login === payload.login && 
        u.password === payload.password,
      )
      if (!found) {
        authError.value = 'Неверный логин или пароль'
        return false
      }
      const user: AuthUser = { 
        login: found.login, 
        name: found.name 
      }
      
      localStorage.setItem('currentUser', JSON.stringify(user))
      currentUser.value = user
      authError.value = ''
      isAuthModalOpen.value = false
      return true
    } catch (e) {
      console.error(e)
      authError.value = 'Не удалось проверить пользователя'
      return false
    }
  }

  const logout = (): void => {
    localStorage.removeItem('currentUser')
    currentUser.value = null
  }

  const logoutAndGoHome = (router: Router): void => {
    logout()
    alert('Вы вышли из аккаунта')
    router.push({ name: 'home' })
  }

  return {
    isAuthModalOpen: isAuthModalOpen as Ref<boolean>,
    authError: authError as Ref<string>,
    currentUser: currentUser as Ref<AuthUser | null>,
    isLoggedIn,
    openAuthModal,
    closeAuthModal,
    login,
    logout,
    logoutAndGoHome,
    initializeFromStorage,
  }
}


