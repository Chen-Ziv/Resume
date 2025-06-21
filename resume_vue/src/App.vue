<script setup>
import { ref, onMounted } from 'vue';
import Loading from './components/Loading.vue';
import AppLayout from './AppLayout.vue';

// 預設為 true（準備顯示 loading 畫面）
const isLoading = ref(true);

// loading 完成或不是第一次進入時，切換為主畫面
const finishLoading = () => {
  localStorage.setItem('visitedResume', 'true'); // 紀錄已訪問過
  isLoading.value = false;
};

// onMounted 判斷是否首次進入
onMounted(() => {
  const visited = localStorage.getItem('visitedResume');
  if (visited) {
    // 如果訪問過，就不顯示 loading，直接進入主畫面
    isLoading.value = false;
  }

  // 若你還有與 script.js 溝通需求（保留這段）
  console.log('AppLayout 掛載完成，通知 script.js');
  window.dispatchEvent(new Event('vue-app-ready'));
});
</script>

<template>
  <div>
    <!-- 首次進入時才會顯示 -->
    <Loading v-if="isLoading" @loading-finish="finishLoading" />

    <!-- 非首次或 loading 結束後顯示主畫面 -->
    <AppLayout v-else>
      <RouterView />
    </AppLayout>
  </div>
</template>
