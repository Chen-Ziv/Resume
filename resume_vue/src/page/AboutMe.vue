
<template>
  <div>
    <h2 class="section-title">自我介紹</h2>
    <div id="intro-content">資料載入中...</div>

    <h2 class="section-title">技能經歷</h2>
    <ul id="skills-list">
      <!-- script.js 會自動塞進來 -->
    </ul>

    <h2 class="section-title">工作經歷</h2>
    <div id="work-list">
      <!-- script.js 會自動塞進來 -->
    </div>

    <h2 class="section-title">學習歷程</h2>
    <div id="education-list">
      <!-- script.js 會自動塞進來 -->
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  window.dispatchEvent(new Event('vue-app-ready'));
  console.log('AboutMe.vue 掛載完成，通知 script.js');
});
</script>

<style scoped>
.section-title {
  font-size: 20px;
  font-weight: bold;
  margin-top: 5px;
  margin-bottom: 12px;
  padding-bottom: 6px;
  border-bottom: 1px solid #ddd;
}
</style>

