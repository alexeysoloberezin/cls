<template>
    <div class="stats-grid">
        <PersonalStatsCard variant="rank" :value="3" />
        <PersonalStatsCard variant="score" :value="2450" />
        <PersonalStatsCard variant="solved" :solved="11" :total="20" />
        <PersonalStatsCard variant="solved" :solved="10" :total="20" />
    </div>
</template>

<script setup>
import PersonalStatsCard from '@entities/PersonalStatsCard.vue';

</script>

<style scoped>
.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
}
</style>