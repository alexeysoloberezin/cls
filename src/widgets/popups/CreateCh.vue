<template>
    <MazBtn @click="isOpen = true">
    Open Dialog
  </MazBtn>

  <MazDialog v-model="isOpen" title="Dialog Title">
    <p>
      Your content
    </p>

    <template #footer="{ close }">
      <MazBtn @click="close">
        Confirm
      </MazBtn>
    </template>
  </MazDialog>
</template>

<script setup>
import MazDialog from 'maz-ui/components/MazDialog'
import { MazBtn } from 'maz-ui/components';
import { ref } from 'vue'

const isOpen = ref(false)
</script>