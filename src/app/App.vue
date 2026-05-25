<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";
import DefaultLayout from "@app/layouts/default.vue";
import { defineAsyncComponent } from "vue";

const route = useRoute();

const layout = computed(() => {
  const loader = route.meta?.layout as () => Promise<typeof import("*.vue")>;
  return loader ? defineAsyncComponent(loader) : DefaultLayout;
});
</script>

<template>
    <component :is="layout" class="app-layout">
      <router-view />
    </component>
    <!-- <Toaster richColors position="bottom-left" theme="dark" /> -->
</template>

<style scoped></style>
