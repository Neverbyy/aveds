<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AuthModal from './components/AuthModal.vue'
import { useAuth } from './composables/useAuth'

const router = useRouter()
const { isAuthModalOpen, authError, currentUser, openAuthModal, closeAuthModal, login, logoutAndGoHome, initializeFromStorage } = useAuth()

const handleAuthSubmit = async (payload: { 
  login: string; 
  password: string }) => {
  const ok = await login(payload)

  if (ok) router.push({ 
    name: 'account' 
  })
}

onMounted(() => {
  initializeFromStorage()
})

</script>

<template>
  <div>
    <header class="header" role="banner">
      <div class="container-header header__inner">
        <RouterLink class="logo" :to="{ name: 'home' }" aria-label="На главную" tabindex="0">logo</RouterLink>
        <nav class="actions" aria-label="Основная навигация">
          <RouterLink class="btn btn--contacts" :to="{ name: 'contacts' }" aria-label="Контакты" tabindex="0">Контакты</RouterLink>
          <button
            class="btn btn--outline"
            type="button"
            :aria-label="currentUser ? 'Выйти из аккаунта' : 'Открыть форму входа'"
            @click="currentUser ? logoutAndGoHome(router) : openAuthModal()"
            @keydown.enter.prevent="currentUser ? logoutAndGoHome(router) : openAuthModal()"
          >{{ currentUser ? 'Выйти' : 'Войти' }}</button>
        </nav>
      </div>
    </header>

    <main>
      <RouterView />
    </main>

    <AuthModal :open="isAuthModalOpen" :error-message="authError" @close="closeAuthModal" @submit="handleAuthSubmit" />
  </div>
</template>

<style scoped>
</style>
