<template>
    <Header></Header>

    <div class="container">
        <div class="pt-[100px]">
            <PersonalStats />
            <Leaderboard />
        </div>
    </div>
</template>
<script setup>
import Leaderboard from '@widgets/blocks/Leaderboard.vue';
import PersonalStats from '@widgets/blocks/PersonalStats.vue';
import Header from '@widgets/core/Header.vue';

</script>