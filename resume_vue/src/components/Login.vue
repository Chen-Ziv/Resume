<template>
  <transition name="fade">
    <div class="loader-wrapper" v-show="visible">
      <!-- 顯示文字 -->
      <div class="enter-text">歡迎進入 Ziv 的履歷網站</div>

      <!-- 進入按鈕 -->
      <button class="enter-btn" @click="enterSite">進入</button>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      visible: true
    };
  },
  methods: {
    enterSite() {
      this.visible = false;
      setTimeout(() => {
        this.$emit("loading-finish");
      }, 600); 
    }
  }
};
</script>

<style>


.loader-wrapper {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
/* 文字樣式 */
.enter-text {
  font-size: 28px;
  font-weight: bold;
  color: #fff;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);
  margin-bottom: 30px;
}

/* 按鈕樣式 */
.enter-btn {
  padding: 10px 30px;
  font-size: 18px;
  background-color: #444;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.enter-btn:hover {
  background-color: #666;
}

/* 淡入淡出動畫 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
