<template>
    <AuthWrapper
        :title="'Вход в учётную запись'"
    >
        <div class="space-y-4 mt-6">
            <div>
                <MazInput
                    v-model="formData.email"
                    label="Электронная почта"
                    autocomplete="off"
                    class="w-full"
                    :error="!!errors.email"
                    :error-message="errors.email"
                    @blur="validateEmail"
                />
            </div>
            <div>
                <MazInput
                    v-model="formData.password"
                    label="Пароль"
                    autocomplete="off"
                    type="password"
                    class="w-full"
                    :error="!!errors.password"
                    :error-message="errors.password"
                    @blur="validatePassword"
                />
            </div>
            <MazBtn class="w-full" @click="loginHandler" :loading="isLoading">Вход</MazBtn>
            <div class="text-[13px] text-center">
                Нет аккаунта? <RouterLink :to="'/register'" class="link"> Регистрация.</RouterLink>
            </div>
        </div>
    </AuthWrapper>
</template>

<script setup>
import AuthWrapper from '@entities/auth/AuthWrapper.vue';
import MazInput from 'maz-ui/components/MazInput'
import MazBtn from 'maz-ui/components/MazBtn'
import { ref, reactive } from 'vue'
import { useToast } from 'maz-ui/composables/useToast'
import { useRouter } from 'vue-router'

const toast = useToast()
const router = useRouter()
const isLoading = ref(false)

const formData = reactive({
    email: '',
    password: ''
})

const errors = reactive({
    email: '',
    password: ''
})

const validateEmail = () => {
    const email = formData.email.trim()
    
    if (!email) {
        errors.email = 'Электронная почта обязательна для заполнения'
        return false
    }
    
    const emailRegex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/
    if (!emailRegex.test(email)) {
        errors.email = 'Введите корректный email адрес'
        return false
    }
    
    errors.email = ''
    return true
}

const validatePassword = () => {
    const password = formData.password
    
    if (!password) {
        errors.password = 'Пароль обязателен для заполнения'
        return false
    }
    
    if (password.length < 6) {
        errors.password = 'Пароль должен содержать минимум 6 символов'
        return false
    }
    
    errors.password = ''
    return true
}

const loginHandler = async () => {
    const isEmailValid = validateEmail()
    const isPasswordValid = validatePassword()
    
    if (!isEmailValid || !isPasswordValid) {
        toast.warning('Пожалуйста, исправьте ошибки в форме')
        return
    }
    
    isLoading.value = true
    
    try {
        const loginData = {
            email: formData.email,
            password: formData.password
        }
        
        // const response = await fetch('/api/login', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(loginData)
        // })
        
        // if (!response.ok) {
        //     const error = await response.json()
        //     throw new Error(error.message || 'Ошибка входа')
        // }
        
        // const data = await response.json()
        // localStorage.setItem('token', data.token)
        
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        toast.success('Вход выполнен успешно!')
        await router.push('/dashboard')
        
    } catch (error) {
        console.error('Login error:', error)
        
        if (error.message.includes('email') || error.message.includes('password')) {
            toast.error('Неверный email или пароль')
        } else {
            toast.error(error.message || 'Произошла ошибка при входе')
        }
    } finally {
        isLoading.value = false
    }
}
</script>

<style scoped>

</style>