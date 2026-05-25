<template>
    <div class="tabs-container">
        <div class="tabs" ref="tabsRef">
            <!-- Анимированная плашка -->
            <div 
                class="active-indicator"
                :style="indicatorStyle"
            ></div>
            
            <!-- Кнопки табов -->
            <button
                v-for="tab in tabs"
                :key="tab.value"
                :ref="el => setTabRef(el, tab.value)"
                class="tab-btn"
                :class="{ active: modelValue === tab.value }"
                @click="selectTab(tab.value)"
            >
                {{ tab.label }}
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue';

const props = defineProps({
    modelValue: {
        type: String,
        default: 'list'
    },
    tabs: {
        type: Array,
        default: () => [
            { label: 'Весь список', value: 'list' },
            { label: 'Топ 10', value: 'top10' }
        ]
    }
});

const emit = defineEmits(['update:modelValue', 'change']);

const tabsRef = ref(null);
const tabButtonsRef = ref(new Map());
const indicatorStyle = ref({
    width: '0px',
    transform: 'translateX(0px)'
});

// Установка ref для кнопок
const setTabRef = (el, value) => {
    if (el) {
        tabButtonsRef.value.set(value, el);
    }
};

// Функция обновления позиции индикатора
const updateIndicator = async () => {
    await nextTick();
    
    const activeButton = tabButtonsRef.value.get(props.modelValue);
    
    if (activeButton && tabsRef.value) {
        // Получаем стили контейнера
        const tabsStyles = window.getComputedStyle(tabsRef.value);
        const tabsPaddingLeft = parseFloat(tabsStyles.paddingLeft);
        
        // Получаем позиции элементов
        const buttonRect = activeButton.getBoundingClientRect();
        const tabsRect = tabsRef.value.getBoundingClientRect();
        
        // Вычисляем позицию с учетом padding контейнера
        const leftPosition = buttonRect.left - tabsRect.left - tabsPaddingLeft;
        
        indicatorStyle.value = {
            width: `${buttonRect.width}px`,
            transform: `translateX(${leftPosition}px)`,
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        };
    }
};

// Выбор таба
const selectTab = (value) => {
    if (value !== props.modelValue) {
        emit('update:modelValue', value);
        emit('change', value);
        updateIndicator();
    }
};

// Функция для debounce resize
let resizeTimeout;
const handleResize = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        updateIndicator();
    }, 100);
};

// Следим за изменением modelValue
watch(() => props.modelValue, () => {
    updateIndicator();
});

// Следим за изменением tabs (если динамически меняются)
watch(() => props.tabs, () => {
    nextTick(() => {
        updateIndicator();
    });
}, { deep: true });

onMounted(() => {
    nextTick(() => {
        updateIndicator();
    });
    window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
    clearTimeout(resizeTimeout);
});
</script>

<style scoped>
.tabs-container {
    display: inline-block;
}

.tabs {
    position: relative;
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 6px;
    background: #4F515E;
    border-radius: 10px;
    height: 38px;
    width: fit-content;
}

/* Анимированная плашка */
.active-indicator {
    position: absolute;
    height: 30px;
    background: #2F3038;
    border-radius: 10px;
    z-index: 1;
    top: 4px; /* Выравниваем по вертикали с учетом padding */
    left: 6px; /* Начальная позиция с учетом левого padding */
    will-change: transform, width;
}

/* Кнопки табов */
.tab-btn {
    position: relative;
    height: 30px;
    padding: 0 20px;
    border: none;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 400;
    cursor: pointer;
    white-space: nowrap;
    background: transparent;
    color: white;
    z-index: 2;
    transition: background-color 0.2s ease;
}

.tab-btn.active {
    background: transparent;
    color: white;
}

.tab-btn:not(.active):hover {
    background: rgba(255, 255, 255, 0.1);
}
</style>