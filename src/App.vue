<script setup lang="ts">
import { ref } from 'vue'
import AuthModal from './components/AuthModal.vue'

const isAuthModalOpen = ref<boolean>(false)

const handleOpenAuthModal = () => { 
  isAuthModalOpen.value = true 

}

const handleCloseAuthModal = () => { 
  isAuthModalOpen.value = false 
}

const handleAuthSubmit = (_payload: { login: string; password: string }) => {
  isAuthModalOpen.value = false
}
</script>

<template>
  <div>
    <header class="header" role="banner">
      <div class="container-header header__inner">
        <a class="logo" href="#" aria-label="На главную" tabindex="0">logo</a>
        <nav class="actions" aria-label="Основная навигация">
          <a class="btn btn--contacts" href="#contacts" aria-label="Контакты" tabindex="0">Контакты</a>
          <button class="btn btn--outline" type="button" aria-label="Открыть форму входа" @click="handleOpenAuthModal" @keydown.enter.prevent="handleOpenAuthModal">Войти</button>
        </nav>
      </div>
    </header>

    <main>
      <section class="hero" aria-labelledby="hero-title">
        <div class="container">
          <h1 id="hero-title" class="hero__title">Место для получения медицинской помощи</h1>
          <div class="hero__actions">
            <button class="btn btn--primary btn--primary-large" type="button" aria-label="Открыть форму входа" @click="handleOpenAuthModal" @keydown.enter.prevent="handleOpenAuthModal">Войти</button>
            <a class="btn btn--contacts btn--contacts-large" href="#contacts" aria-label="Контакты" tabindex="0">Контакты</a>
          </div>

          <section class="services" aria-label="Услуги">
            <div class="cards">
              <article class="card" tabindex="0" aria-label="Онлайн-прием">
                <div class="card__icon" aria-hidden="true">❤</div>
                <h3 class="card__title">Онлайн-прием</h3>
                <div class="card__divider" aria-hidden="true"></div>
                <p class="card__text">Рыба текст</p>
              </article>

              <article class="card" tabindex="0" aria-label="Экстренный случай">
                <div class="card__icon" aria-hidden="true">⚕</div>
                <h3 class="card__title">Экстренный Случай</h3>
                <div class="card__divider" aria-hidden="true"></div>
                <p class="card__text">Рыба текст</p>
              </article>

              <article class="card" tabindex="0" aria-label="Лечение рака">
                <div class="card__icon" aria-hidden="true">🧪</div>
                <h3 class="card__title">Лечение рака</h3>
                <div class="card__divider" aria-hidden="true"></div>
                <p class="card__text">Рыба текст</p>
              </article>
            </div>
      </section>
        </div>
      </section>

    </main>

    <AuthModal :open="isAuthModalOpen" @close="handleCloseAuthModal" @submit="handleAuthSubmit" />
  </div>
</template>

<style scoped>
</style>
