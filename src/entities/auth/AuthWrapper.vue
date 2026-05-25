<template>
    <div class="auth-wrapper">
        <img class="auth-bg" src="/imgs/authbg.png" alt="">
        <div class="auth-card">
            <div class="auth-card-wrp"> 
                <img class="auth-logo" src="/Logo.svg" alt="">
            <h3 class="auth-title">{{ title }}</h3>
            </div>
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['title'])
</script>

<style>
.auth-wrapper{
    background: #100F14;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;justify-content: center;
}
.auth-card{
    background: #1a191dde;
    border: 1px solid #ffffff0a;
    position: relative;
    z-index: 10;
    width: 480px;
    border-radius: 16px;
    backdrop-filter: blur(10px);
    padding: 40px 50px;
}
.auth-card-wrp{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.auth-title{
    font-size: 24px;
    font-weight: 600;
    text-align: center;
    margin-top: 20px;
}
.auth-bg{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>