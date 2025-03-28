<script setup>
import { ref } from 'vue';
import Loading from './components/Loading.vue';
import AppLayout from './AppLayout.vue';

// 設定 isLoading 為 true，表示先顯示 Loading 畫面
const isLoading = ref(true);

// 當 Loading.vue 執行完成後，改變 isLoading 狀態
const finishLoading = () => {
  isLoading.value = false;
};
</script>

<template>
  <div>
    <!-- 先顯示 Loading 畫面，當 isLoading 為 true 時 -->
    <Loading v-if="isLoading" @loading-finish="finishLoading" />

    <!-- 當 Loading 結束後，顯示主版頁面（包含 HelloWorld.vue） -->
    <AppLayout v-else>
      <!-- <AppLayout> -->

        <RouterView />
      </AppLayout>
  </div>
</template>

