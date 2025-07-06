<template>
  <div>
    <h2 class="section-title">工作經歷</h2>
    <div id="resume-container"  data-block="工作經歷" >資料載入中...</div> <!-- ✅ 對應 script.js 中的 container -->
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  window.dispatchEvent(new Event('vue-app-ready')); // ✅ 通知 script.js 啟動 fetch
  console.log('AboutMe.vue 掛載完成，通知 script.js');
});
</script>

<style scoped>
.section-title {
  font-size: 25px;
  font-weight: bold;
  margin-top: 16px;
  margin-bottom: 12px;
  padding-bottom: 6px;
  border-bottom: 1px solid #ddd;
}
</style>
