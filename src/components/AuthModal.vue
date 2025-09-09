<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

type Props = {
  open: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{ (e: 'close'): void; (e: 'submit', payload: { login: string; password: string }): void }>()

const loginRef = ref<HTMLInputElement | null>(null)
const formRef = ref<HTMLFormElement | null>(null)

const handleClose = () => emit('close')

const handleKeydown = (event: KeyboardEvent) => {
  if (!props.open) return
  if (event.key === 'Escape') {
    handleClose()
  }
}

onMounted(async () => {
  window.addEventListener('keydown', handleKeydown)
  await nextTick()
  if (props.open) loginRef.value?.focus()
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
})

const handleSubmit = (event: Event) => {
  event.preventDefault()
  const form = formRef.value
  if (!form) return
  const formData = new FormData(form)
  const login = String(formData.get('login') ?? '')
  const password = String(formData.get('password') ?? '')
  emit('submit', { login, password })
}
</script>

<template>
  <div v-if="open" class="modal" role="dialog" aria-modal="true" aria-labelledby="auth-title" @click.self="handleClose">
    <div class="modal__dialog" tabindex="-1">
      <header class="modal__header">
        <h2 id="auth-title" class="modal__title">Вход</h2>
        <button class="modal__close" type="button" aria-label="Закрыть" @click="handleClose">×</button>
      </header>
      <form ref="formRef" class="auth-form" @submit="handleSubmit" aria-label="Форма авторизации">
        <label class="field">
          <span class="field__label">Логин</span>
          <input ref="loginRef" class="field__input" type="text" name="login" autocomplete="username" required />
        </label>
        <label class="field">
          <span class="field__label">Пароль</span>
          <input class="field__input" type="password" name="password" autocomplete="current-password" required />
        </label>
        <div class="auth-form__actions">
          <button type="submit" class="btn btn--primary">Войти</button>
          <button type="button" class="btn btn--outline" @click="handleClose">Отмена</button>
        </div>
      </form>
    </div>
  </div>
  
</template>

<style scoped>
.modal {
  position: fixed;
  inset: 0;
  background: rgba(10, 20, 30, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  z-index: 1000;
}
.modal__dialog {
  width: 100%;
  max-width: 420px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 30px 60px rgba(18, 28, 40, 0.2);
  padding: 20px 20px 24px;
}
.modal__header { 
  display: flex; 
  align-items: center; 
  justify-content: space-between; 
}
.modal__title { 
  margin: 0; 
  font-size: 20px; 
}
.modal__close { 
  background: transparent; 
  border: 0; 
  font-size: 24px; 
  line-height: 1; 
  cursor: pointer; 
}

.auth-form { 
  display: grid; 
  gap: 14px; 
  margin-top: 12px; 
}
.field { 
  display: grid; 
  gap: 6px; 
}
.field__label { 
  font-size: 13px; 
  color: var(--muted); 
}
.field__input {
  height: 40px;
  padding: 0 12px;
  border: 1px solid #e3e7ee;
  border-radius: 8px;
  font-size: 14px;
}
.field__input:focus { 
  outline: 1px solid #898989;
}
.auth-form__actions { 
  display: flex; 
  gap: 10px; 
  justify-content: flex-end; 
  margin-top: 6px; 
}
</style>


