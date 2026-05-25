<template>
  <div>
    <Vue3Lottie :width="250" :height="250" :animation-data="animationData" />
  </div>
</template>

<script setup lang="ts">
import { Vue3Lottie } from "vue3-lottie";
import animationData from "@shared/icons/LoadingCreate/loadingCreate.json";
</script>

<style scoped lang="scss"></style>
