<template>
    <header class="header">
       <div class="container">
        <div class="header-container">
            <div class="header-left">
                <img src="/Logo.svg" alt="Logo" />
            </div>
            
            <nav class="header-nav">
                <RouterLink to="/competitions" class="nav-link" active-class="active">
                    <img src="/imgs/icon1.svg" alt="">
                    Соревнования
                </RouterLink>
                <RouterLink to="/leaderboard" class="nav-link" active-class="active">
                    <img src="/imgs/icon2.svg" alt="">
                    Таблица лидеров
                </RouterLink>
            </nav>
            
            <div class="header-right">
                <template v-if="user">
                    <div class="username mr-3">{{ user?.name }}</div>
                    <MazAvatar v-if="user?.image" :src="user.image" size="0.7rem" />
                    <MazAvatar v-else :caption="user?.name" size="0.7rem" />
                </template>
            </div>
        </div>
       </div>
    </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import MazAvatar from 'maz-ui/components/MazAvatar'
import { ref } from 'vue';

const user = ref({
    image: '',
    name: 'Константин Константиновский',
    email: 'Kiobssmer@gmail.com'
})
</script>

<style scoped>
.username{
    max-width: 160px;
    line-height: 1.2;
    font-weight: 400;
    text-align: right;
    font-size: 13px;
}
.header {
    background-color: #100F14;
    height: 54px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
}

.header-container {
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.header-left {
    display: flex;
    align-items: center;
    gap: 12px;
}

.logo {
    height: 32px;
    width: auto;
}

.brand-name {
    color: white;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 0.5px;
}

.header-nav {
    display: flex;
    align-items: center;
    gap: 32px;
}

.nav-link {
    color: #B8BCBF;
    text-decoration: none;
    font-size: 14px;
    font-weight: 400;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: color 0.2s ease;
    padding: 4px 0;
}

.nav-link:hover {
    color: rgba(255, 255, 255, 1);
}

.nav-link.active {
    color: white;
    position: relative;
}

.nav-link.active::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: var(--maz-color-primary, #3b82f6);
    border-radius: 1px;
}

.header-right {
    display: flex;
    align-items: center;
}

@media (max-width: 768px) {
    .header-container {
        padding: 0 16px;
    }
    
    .brand-name {
        display: none;
    }
    
    .header-nav {
        gap: 20px;
    }
    
    .nav-link {
        font-size: 13px;
    }
}
</style>