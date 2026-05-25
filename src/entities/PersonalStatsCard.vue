<template>
    <div class="stats-card" :class="`stats-card--${variant}`">
        <div class="stats-card__content">
            <div v-if="variant === 'rank'" class="stats-card__item">
                <span class="stats-card__label">Ваш ранг</span>
                <span class="stats-card__value">#{{ value }}</span>
                <img  class="stats-card-icon" src="/imgs/card1.svg" alt="">
            </div>
            
            <div v-if="variant === 'score'" class="stats-card__item">
                <span class="stats-card__label">Ваш счет</span>
                <span class="stats-card__value">{{ value }}</span>
                <img class="stats-card-icon"  src="/imgs/card2.svg" alt="">

            </div>
            
            <div v-if="variant === 'solved'" class="stats-card__item stats-card__item--solved">
                <img class="stats-card-icon"  src="/imgs/card3.svg" alt="">

                <div class="stats-card__solved-header">
                    <span class="stats-card__label">Задач решено</span>
                </div>
                <div class="stats-card__solved-value">
                    <span class="stats-card__value">{{ solved }}</span>
                    <span class="stats-card__total"> / {{ total }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    variant: {
        type: String,
        required: true,
        validator: (value) => ['rank', 'score', 'solved'].includes(value)
    },
    value: {
        type: [Number, String],
        default: null
    },
    solved: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        default: 0
    }
})
</script>

<style scoped>
.stats-card {
    background: #100F14;
    border-radius: 12px;
    position: relative;
    border: 1px solid #2F3038;
    padding: 20px;
    transition: all 0.3s ease;
}

.stats-card:hover {
    transform: translateY(-2px);
}

.stats-card__item {
    display: flex;
    flex-direction: column;
    gap: 8px;
}
.stats-card-icon{
    position: absolute;
    top: 15px;
    right: 15px;
}

.stats-card__label {
    font-size: 14px;
    font-weight: 400;
}

.stats-card__value {
    font-size: 35px;
    font-weight: 500;
    color: white;
    line-height: 1.2;
}

.stats-card--rank .stats-card__value {
    color: #FFD700;
}

.stats-card--score .stats-card__value {
    background: linear-gradient(135deg, #fff 0%, #a0a0a0 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}
.stats-card__solved-value *{
    color: #64CE68;
}
.stats-card__solved-value {
    display: flex;
    align-items: baseline;
    gap: 4px;
}

.stats-card__total {
    font-size: 18px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.4);
}

@media (max-width: 640px) {
    .stats-card {
        padding: 16px;
    }
    
    .stats-card__value {
        font-size: 28px;
    }
    
    .stats-card__total {
        font-size: 16px;
    }
    
    .stats-card__label {
        font-size: 12px;
    }
}
</style>