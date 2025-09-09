<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick, computed, watch } from 'vue'

type Props = {
  open: boolean
  errorMessage?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{ (e: 'close'): void; (e: 'submit', payload: { login: string; password: string }): void }>()

const loginRef = ref<HTMLInputElement | null>(null)
const form = ref<{ 
    login: string; 
    password: string 
}>({ login: '', password: '' })

const touched = ref<{ 
    login: boolean; 
    password: boolean
}> ({ login: false, password: false })


const errors = computed<Record<string, string>>(() => 
{
  const out: Record<string, string> = {}
  if (touched.value.login && !form.value.login.trim()) out.login = 'Укажите логин'

  if (touched.value.password) {

    if (!form.value.password) out.password = 'Укажите пароль'
    else if (form.value.password.length < 8) out.password = 'Минимум 8 символов'
  }
  return out
})

const isValid = computed<boolean>(() => 
!errors.value.login && 
!errors.value.password && 
form.value.login.trim() !== '' && 
form.value.password.length >= 8)

const resetForm = () => {
  form.value.login = ''
  form.value.password = ''
  touched.value.login = false
  touched.value.password = false
}

const handleClose = () => {
  resetForm()
  emit('close')
}

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

watch(() => props.open, async (isOpen, wasOpen) => {
  if (!isOpen && wasOpen) {
    resetForm()
  }
  if (isOpen) {
    await nextTick()
    loginRef.value?.focus()
  }
})

const handleSubmit = (event: Event) => {
  event.preventDefault()
  touched.value.login = true
  touched.value.password = true
  if (!isValid.value) return
  emit('submit', { login: form.value.login.trim(), password: form.value.password })
}
</script>

<template>
  <div v-if="open" class="modal" role="dialog" aria-modal="true" aria-labelledby="auth-title" @click.self="handleClose">
    <div class="modal__dialog" tabindex="-1">
      <header class="modal__header">
        <h2 id="auth-title" class="modal__title">Вход</h2>
        <button class="modal__close" type="button" aria-label="Закрыть" @click="handleClose">×</button>
      </header>
      <form class="auth-form" @submit="handleSubmit" aria-label="Форма авторизации">
        <label class="field">
          <span class="field__label">Логин</span>
          <input ref="loginRef" class="field__input" type="text" name="login" autocomplete="username" 
                 v-model.trim="form.login" @blur="touched.login = true" :aria-invalid="!!errors.login" />
          <span v-if="errors.login" class="field__error">{{ errors.login }}</span>
        </label>
        <label class="field">
          <span class="field__label">Пароль</span>
          <input class="field__input" type="password" name="password" autocomplete="current-password" 
                 v-model="form.password" @blur="touched.password = true" :aria-invalid="!!errors.password" />
          <span v-if="errors.password" class="field__error">{{ errors.password }}</span>
        </label>
        <p v-if="props.errorMessage" class="form__error" role="alert" aria-live="polite">{{ props.errorMessage }}</p>
        <div class="auth-form__actions">
          <button type="submit" class="btn btn--primary" :disabled="!isValid">Войти</button>
          <button type="button" class="btn btn--outline" @click="handleClose">Отмена</button>
        </div>
      </form>
    </div>
  </div>
  
</template>

<style scoped>
.field__error { color: #d93025; font-size: 12px; }
.form__error { color: #d93025; font-size: 13px; margin-top: 6px; }
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


