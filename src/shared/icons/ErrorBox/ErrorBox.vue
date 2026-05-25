<template>
    <div class="empty-state">
      <Vue3Lottie
        :animationData="animationData"
        :height="height || 300"
        :width="width || 300"
      ></Vue3Lottie>
      <h2>{{ title }}</h2>
      <p>{{ text }}</p>
      <slot></slot>
    </div>
  </template>
  
  <script setup lang="ts">
  import animationData from "@shared/icons/ErrorBox/errorBox.json";
  import { Vue3Lottie } from "vue3-lottie";
  
  defineProps<{
    title: string;
    text: string;
    width?: number;
    height?: number;
  }>();
  </script>
  
  <style scoped lang="scss">
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 20px;
  }
  
  .empty-state h2 {
    margin-top: 1rem;
    font-size: 1.5rem;
    font-weight: 600;
  }
  
  .empty-state p {
    color: #aaa;
    margin-top: 0.5rem;
  }
  </style>
  