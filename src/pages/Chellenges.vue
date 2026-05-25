<template>
    <Header></Header>
    <div class="container">
        <div class="pt-[100px]">
            <div class="card p-[30px]">
    <CreateCh></CreateCh>

                <div class="flex items-center">
                    <h2 class="text-[22px]">Задания</h2>
                    <div class="flex items-center gap-4 ml-auto">
                        <MazBtn size="xs">Добавить задание</MazBtn>
                        <Tabs 
                            v-model="currentTab"
                            :tabs="customTabs"
                        />
                    </div>
                </div>
                <div class="cards-container mt-[20px]">
                    <ChCard
                        title="SQL Injection on Rocket"
                        :points="500"
                        :tasks-total="15"
                        :tasks-solved="15"
                        category="Web"
                    />

                    <ChCard
                        title="SQL Injection on Rocket"
                        :points="500"
                        :tasks-total="25"
                        :tasks-solved="15"
                        category="Web"
                    />
                    <ChCard
                        title="SQL Injection on Rocket"
                        :points="500"
                        :tasks-total="25"
                        :tasks-solved="0"
                        category="Web"
                    />

                    <ChCard
                        title="SQL Injection on Rocket"
                        :points="1222"
                        :tasks-total="14"
                        :tasks-solved="3"
                        category="Web"
                    />

                    <ChCard
                        title="SQL Injection on Rocket"
                        :points="1222"
                        :tasks-total="14"
                        :tasks-solved="0"
                        category="Web"
                    />

                    <ChCard
                        title="SQL Injection on Rocket"
                        :points="1222"
                        :tasks-total="14"
                        :tasks-solved="14"
                        category="Web"
                    />
                    </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import Header from '@widgets/core/Header.vue';
import MazBtn from 'maz-ui/components/MazBtn';
import Tabs from '@entities/core/Tabs.vue';
import {ref} from 'vue'
import ChCard from '@entities/core/ChCard.vue';
import CreateCh from '@widgets/popups/CreateCh.vue';

const currentTab = ref('all');

const customTabs = ref([
    { label: 'Infair', value: 'Infair' },
    { label: 'WEB', value: 'WEB' },
    { label: 'ALL', value: 'all' }
]);
</script>