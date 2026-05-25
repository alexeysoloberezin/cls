<template>
    <AuthWrapper
        :title="'Создание учётной записи'"
    >
        <div v-if="step === 0" class="space-y-4 mt-6">
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
                <div v-if="!errors.password && formData.password" class="text-xs text-muted-color mt-1">
                    <div :class="getPasswordStrengthClass()">Надёжность: {{ getPasswordStrengthText() }}</div>
                </div>
            </div>
            <MazBtn class="w-full" @click="stepOneNext">Далее</MazBtn>
            <div class="text-[13px] text-center">
                У меня есть аккаунт. <RouterLink :to="'/login'" class="link">Авторизоваться.</RouterLink>
            </div>
        </div>
        
        <div v-if="step === 1" class="space-y-4 mt-6">
            <div>
                <MazInput
                    v-model="formData.telegram"
                    label="Telegram (username)"
                    autocomplete="off"
                    class="w-full"
                    placeholder="@username"
                    :error="!!errors.telegram"
                    :error-message="errors.telegram"
                    @blur="validateTelegram"
                />
                <div class="text-xs text-muted-color mt-1">
                    Введите ваш Telegram username для получения уведомлений
                </div>
            </div>
            
            <div class="flex gap-2">
                <div class="mt-1">
                    <ToggleSwitch v-model="formData.agreement" />
                </div>
                <div class="text-[13px]">
                    Я ознакомлен с 
                    <RouterLink to="/rules" class="link">правилами соревнования</RouterLink> 
                    и подтверждаю, что не буду использовать автоматические сканеры против инфраструктуры
                </div>
            </div>
            
            <div class="grid grid-cols-[1.2fr_2fr] gap-3">
                <MazBtn class="w-full" color="background" @click="goBack">Назад</MazBtn>
                <MazBtn class="w-full" @click="registerHandler" :loading="isLoading">Регистрация</MazBtn>
            </div>
        </div>
    </AuthWrapper>
</template>

<script setup>
import AuthWrapper from '@entities/auth/AuthWrapper.vue';
import MazInput from 'maz-ui/components/MazInput'
import MazBtn from 'maz-ui/components/MazBtn'
import ToggleSwitch from 'primevue/toggleswitch';
import { ref, reactive, computed } from 'vue'
import { useToast } from 'maz-ui/composables/useToast'
import { useRouter } from 'vue-router'

const toast = useToast()
const router = useRouter()
const isLoading = ref(false)

const formData = reactive({
    email: '',
    password: '',
    telegram: '',
    agreement: false
})

const errors = reactive({
    email: '',
    password: '',
    telegram: ''
})

const step = ref(0)

const validateEmail = () => {
    const email = formData.email.trim()
    
    if (!email) {
        errors.email = 'Электронная почта обязательна для заполнения'
        return false
    }
    
    const emailRegex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/
    if (!emailRegex.test(email)) {
        errors.email = 'Введите корректный email адрес (например: user@example.com)'
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
    
    if (password.length < 8) {
        errors.password = 'Пароль должен содержать минимум 8 символов'
        return false
    }
    
    // Проверка на сложность пароля
    let strength = 0
    if (/[a-z]/.test(password)) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^a-zA-Z0-9]/.test(password)) strength++
    
    if (strength < 2) {
        errors.password = 'Пароль слишком простой. Используйте буквы разного регистра, цифры или спецсимволы'
        return false
    }
    
    errors.password = ''
    return true
}

const validateTelegram = () => {
    const telegram = formData.telegram.trim()
    
    if (!telegram) {
        errors.telegram = 'Telegram username обязателен для заполнения'
        return false
    }
    
    let cleanTelegram = telegram
    if (telegram.startsWith('@')) {
        cleanTelegram = telegram.substring(1)
        formData.telegram = cleanTelegram
    }
    
    const telegramRegex = /^[a-zA-Z0-9_]{5,32}$/
    if (!telegramRegex.test(cleanTelegram)) {
        errors.telegram = 'Введите корректный Telegram username (5-32 символа, буквы, цифры, _)'
        return false
    }
    
    errors.telegram = ''
    return true
}

const getPasswordStrengthText = () => {
    const password = formData.password
    if (!password) return ''
    
    let strength = 0
    if (/[a-z]/.test(password)) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^a-zA-Z0-9]/.test(password)) strength++
    
    if (strength === 4) return 'Отличный'
    if (strength === 3) return 'Хороший'
    if (strength === 2) return 'Средний'
    return 'Слабый'
}

const getPasswordStrengthClass = () => {
    const strength = getPasswordStrengthText()
    switch(strength) {
        case 'Отличный': return 'text-green-600'
        case 'Хороший': return 'text-blue-600'
        case 'Средний': return 'text-yellow-600'
        case 'Слабый': return 'text-red-600'
        default: return ''
    }
}

const stepOneNext = async () => {
    const isEmailValid = validateEmail()
    const isPasswordValid = validatePassword()
    
    if (!isEmailValid || !isPasswordValid) {
        if (!isEmailValid) {
            toast.warning('Пожалуйста, исправьте ошибки в форме')
        } else if (!isPasswordValid) {
            toast.warning('Пожалуйста, исправьте ошибки в форме')
        }
        return
    }
    
    step.value = 1
}

const goBack = () => {
    step.value = 0
    errors.telegram = ''
}

const registerHandler = async () => {
    const isTelegramValid = validateTelegram()
    
    if (!isTelegramValid) {
        toast.warning('Пожалуйста, исправьте ошибки в поле Telegram')
        return
    }
    
    if (!formData.agreement) {
        toast.warning('Необходимо подтвердить согласие с правилами соревнования')
        return
    }
    
    isLoading.value = true
    
    try {
        const registrationData = {
            email: formData.email,
            password: formData.password,
            telegram: formData.telegram
        }
        
        // const response = await fetch('/api/register', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(registrationData)
        // })
        
        // if (!response.ok) {
        //     const error = await response.json()
        //     throw new Error(error.message || 'Ошибка регистрации')
        // }
        
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        toast.success('Регистрация успешно завершена!')
        
        await router.push('/login')
        
    } catch (error) {
        console.error('Registration error:', error)
        toast.error(error.message || 'Произошла ошибка при регистрации. Попробуйте позже.')
    } finally {
        isLoading.value = false
    }
}

const isStepOneValid = computed(() => {
    return !errors.email && !errors.password && formData.email && formData.password
})

const isStepTwoValid = computed(() => {
    return !errors.telegram && formData.telegram && formData.agreement
})
</script>

<style scoped>

</style>