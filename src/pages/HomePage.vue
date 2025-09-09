<script setup lang="ts">
import { useAuth } from '../composables/useAuth'

const { isLoggedIn, openAuthModal, logoutAndGoHome } = useAuth()
</script>

<template>
  <section class="hero" aria-labelledby="hero-title">
    <div class="container">
      <h1 id="hero-title" class="hero__title">Место для получения медицинской помощи</h1>
      <div class="hero__actions">
        <button
          class="btn btn--primary btn--primary-large"
          type="button"
          :aria-label="isLoggedIn ? 'Выйти из аккаунта' : 'Открыть форму входа'"
          @click="isLoggedIn ? logoutAndGoHome($router) : openAuthModal()"
          @keydown.enter.prevent="isLoggedIn ? logoutAndGoHome($router) : openAuthModal()"
        >{{ isLoggedIn ? 'Выйти' : 'Войти' }}</button>

        <RouterLink
            class="btn btn--contacts btn--contacts-large"
            :to="{ name: 'contacts' }"
            aria-label="Контакты"
            tabindex="0"
          >Контакты
        </RouterLink>
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
</template>


