<template>
    <div class="pag">
        <button 
            class="pag-btn" 
            :disabled="currentPage === 1" 
            @click="prevPage"
        >
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                    fill-rule="evenodd" 
                    clip-rule="evenodd" 
                    d="M0.46967 5.53033C0.176776 5.23744 0.176776 4.76256 0.46967 4.46967L4.46967 0.46967C4.76256 0.176777 5.23744 0.176777 5.53033 0.46967C5.82322 0.762563 5.82322 1.23744 5.53033 1.53033L2.06066 5L5.53033 8.46967C5.82322 8.76256 5.82322 9.23744 5.53033 9.53033C5.23744 9.82322 4.76256 9.82322 4.46967 9.53033L0.46967 5.53033Z" 
                    fill="white"
                />
            </svg>
        </button>
        
        <div class="pag-inp">
            {{ currentPage }}
        </div>
        
        <div class="pag-total" :style="{whiteSpace: 'nowrap'}">
            из {{ totalPagesCount }}
        </div>
        
        <button 
            class="pag-btn" 
            :disabled="currentPage >= totalPagesCount" 
            @click="nextPage"
            :style="{transform: 'rotate(180deg)'}"
        >
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                    fill-rule="evenodd" 
                    clip-rule="evenodd" 
                    d="M0.46967 5.53033C0.176776 5.23744 0.176776 4.76256 0.46967 4.46967L4.46967 0.46967C4.76256 0.176777 5.23744 0.176777 5.53033 0.46967C5.82322 0.762563 5.82322 1.23744 5.53033 1.53033L2.06066 5L5.53033 8.46967C5.82322 8.76256 5.82322 9.23744 5.53033 9.53033C5.23744 9.82322 4.76256 9.82322 4.46967 9.53033L0.46967 5.53033Z" 
                    fill="white"
                />
            </svg>
        </button>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    page: {
        type: Number,
        default: 1
    },
    totalPages: {
        type: Number,
        required: true
    },
    perPage: {
        type: Number,
        default: 10
    }
});

const emit = defineEmits(['update:page', 'page-change']);

const currentPage = computed({
    get: () => props.page,
    set: (value) => {
        emit('update:page', value);
    }
});

const totalPagesCount = computed(() => 
    Math.max(1, Math.ceil(props.totalPages / props.perPage))
);

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
        emit('page-change', currentPage.value);
    }
};

const nextPage = () => {
    if (currentPage.value < totalPagesCount.value) {
        currentPage.value++;
        emit('page-change', currentPage.value);
    }
};
</script>
