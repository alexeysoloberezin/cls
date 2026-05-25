<template>
    <div :class="['card', `card--${variant}`]">
      <div class="card__header">
        <span class="card__category">
           {{ category }}
        </span>
        <span :class="['card__status', statusClass]">{{ statusText }}</span>
      </div>
  
      <h3 class="card__title">{{ title }}</h3>
  
      <div class="card__points">
        <span class="points-value">{{ points }}</span>
        <span class="points-label">очков</span>
      </div>
  
      <div class="card__tasks">
        <div class="tasks-info">
          <span >✔ {{ tasksSolved }} решено</span>
          <span>{{ tasksTotal }} задач</span>
        </div>
  
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: progressPercent + '%' }" />
        </div>
      </div>
  
      <div v-if="variant === 'in_progress'" class="card__remaining">
        Осталось решить: {{ tasksTotal - tasksSolved }} задач
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  

  const props = defineProps({
  
    title: {
      type: String,
      required: true
    },
    points: {
      type: Number,
      required: true
    },
    tasksTotal: {
      type: Number,
      required: true
    },
    tasksSolved: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      required: true
    },
  })
  
const variant = computed(() => {
    if(props.tasksSolved === 0) return 'not_started'
    if(props.tasksSolved === props.tasksTotal) return 'completed'
    return 'in_progress'
})


  const isCompleted = computed(() => variant.value === 'completed')
  
  const statusText = computed(() => {
    if(props.tasksSolved === 0) return 'Не начата'
    if(props.tasksSolved === props.tasksTotal) return 'Выполнена'
    return 'В процессе'
  })
  
  const statusClass = computed(() => 
    isCompleted.value ? 'status-completed' : 'status-progress'
  )
  
  const progressPercent = computed(() => 
    (props.tasksSolved / props.tasksTotal) * 100
  )
  </script>
  
  <style scoped>
  .card {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    border-radius: 20px;
    padding: 1.3rem 1rem 0.8rem;
    color: #fff;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
  }
  
  .card--completed {
    border-left: 2px solid #4caf50;
    background: linear-gradient(90deg, #172417 0%, #131a16 50%);
  }
  
  .card--in_progress {
    border-left: 2px solid #00C8FF;
  }
  
  .card__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    font-size: 0.9rem;
  }
  
  .card__category {
    background: rgba(255, 255, 255, 0.1);
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    font-size: 0.8rem;
  }
  
  .card__status {
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
  }
  
  .status-completed {
    background: #4caf50;
    color: white;
  }
  
  .status-progress {
    /* background: #00C8FF; */
    /* border: 1px solid #00c8ff5d; */
    color: #999;
    padding: 0;
  }
  
  .card__title {
    font-size: 1.2rem;
    margin: 0.5rem 0;
    font-weight: 600;
  }
  
  .card__points {
    margin: 1rem 0;
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
  }
  
  .points-value {
    font-size: 1.5rem;
    font-weight: bold;
    color: #DEB15B;
  }
  
  .points-label {
    color: #999;
    font-size: 0.8rem;
  }
  .card--in_progress .points-value{
    color: #00C8FF;
  }
  .card__tasks {
    margin: 1rem 0;
  }
  
  .tasks-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    font-size: 0.8rem;
    color: #999;
  }
  
  .progress-bar {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    height: 8px;
    overflow: hidden;
  }
  
  .progress-fill {
    height: 100%;
    background: #4caf50;
    border-radius: 10px;
    transition: width 0.3s ease;
  }
  
  .card--in_progress .progress-fill {
    background: #00C8FF;
  }
  
  .card__remaining {
    margin-top: 1rem;
    font-size: 0.75rem;
    color: #00C8FF;
    text-align: center;
    padding-top: 0.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
  .card--not_started .points-value{
    color: #fff;
  }
  .card--not_started{
    background: linear-gradient(135deg, #0f0f13 0%, #141720 100%);
  }
  </style>