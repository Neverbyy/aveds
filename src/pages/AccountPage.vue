<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { currentUser, logoutAndGoHome } = useAuth()

const handleLogout = () => logoutAndGoHome(router)

const userName = computed(() => currentUser.value?.name || 'Гость')
</script>

<template>
  <section class="hero container" aria-label="Личный кабинет">
    <h1 class="hero__title">Привет, {{ userName }}</h1>
    <div class="hero__actions">
      <button class="btn btn--primary" type="button" @click="handleLogout">Выйти из аккаунта</button>
      <RouterLink 
        class="btn btn--outline" 
        :to="{ name: 'contacts' }" 
        type="button" 
        aria-label="Контакты">
        Перейти в контакты
      </RouterLink>
    </div>
  </section>
</template>


