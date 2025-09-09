<script setup lang="ts">
</script>

<template>
  <div>
    <header class="header" role="banner">
      <div class="container-header header__inner">
        <a class="logo" href="#" aria-label="На главную" tabindex="0">logo</a>
        <nav class="actions" aria-label="Основная навигация">
          <a class="btn btn--contacts" href="#contacts" aria-label="Контакты" tabindex="0">Контакты</a>
          <a class="btn btn--outline" href="#login" aria-label="Войти" tabindex="0">Войти</a>
        </nav>
      </div>
    </header>

    <main>
      <section class="hero" aria-labelledby="hero-title">
        <div class="container">
          <h1 id="hero-title" class="hero__title">Место для получения медицинской помощи</h1>
          <div class="hero__actions">
            <a class="btn btn--primary btn--primary-large" href="#login" aria-label="Войти" tabindex="0">Войти</a>
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
  </div>
</template>

<style scoped>
/* Локальные донастройки для конкретной страницы при необходимости */
</style>
