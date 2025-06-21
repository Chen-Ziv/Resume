<template>
  <transition name="fade">
    <div class="loader-wrapper" v-show="visible">
      <!-- 打字動畫 -->
      <div class="typing-text">
        {{ displayedText }}<span class="cursor" :class="{ blink: showCursor }">|</span>
      </div>

      <!-- 進度條 -->
      <div class="loader">
        <div class="loader-percentage">{{ percentage }}%</div>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: percentage + '%' }"></div>
        </div>
      </div>
    </div>
  </transition>
</template>


<script>
export default {
  data() {
    return {
      percentage: 0,
      textArray: ["載入中，請稍候...", "準備進入主頁面...", "即將完成！"],
      displayedText: "",
      textIndex: 0,
      charIndex: 0,
      isDeleting: false,
      showCursor: true,
      isTypingDone: false,
      isLoadingDone: false,
      visible: true, // 控制淡出
    };
  },
  mounted() {
    this.startTyping();
    this.startLoading();
  },
  methods: {
    startTyping() {
      const typingSpeed = 100;
      const deletingSpeed = 50;
      const pauseTime = 1000;

      const type = () => {
        const currentText = this.textArray[this.textIndex];

        if (this.isDeleting) {
          this.displayedText = currentText.substring(0, this.charIndex - 1);
          this.charIndex--;

          if (this.charIndex === 0) {
            this.isDeleting = false;
            if (this.textIndex === this.textArray.length - 1) {
              this.isTypingDone = true;
              this.checkIfAllDone();
              return;
            }
            this.textIndex = (this.textIndex + 1) % this.textArray.length;
          }
        } else {
          this.displayedText = currentText.substring(0, this.charIndex + 1);
          this.charIndex++;
          if (this.charIndex === currentText.length) {
            this.isDeleting = true;
            setTimeout(type, pauseTime);
            return;
          }
        }
        setTimeout(type, this.isDeleting ? deletingSpeed : typingSpeed);
      };

      type();
    },

    startLoading() {
      const interval = setInterval(() => {
        if (this.percentage < 100) {
          this.percentage++;
        } else {
          clearInterval(interval);
          this.isLoadingDone = true;
          this.checkIfAllDone();
        }
      }, 50);
    },

    checkIfAllDone() {
      if (this.isTypingDone && this.isLoadingDone) {
        this.visible = false;
        setTimeout(() => {
          this.$emit("loading-finish");
        }, 600); // 與動畫時間一致
      }
    },
  },
};
</script>

<style >
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  background: url('background.png') no-repeat center center fixed;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  overflow: hidden;
}
.loader-wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0;
  height: 100%;
  width: 100%;
  background: url('background.png') no-repeat center center fixed;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  overflow: hidden;
}



.typing-text {
  font-size: 24px;
  font-weight: bold;
  color: rgb(255, 255, 255);
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.cursor {
  font-weight: bold;
  color: white;
  animation: blinkCursor 0.8s infinite;
}

@keyframes blinkCursor {
  50% {
    opacity: 0;
  }
}

.loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 300px;
  padding: 0 10px;
  box-sizing: border-box;
  margin-top: 20px;
}

.progress-bar {
  width: 100%;
  height: 15px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  overflow: hidden;
  margin-top: 10px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(to right, #5a5858, #5a5858);
  transition: width 0.3s ease-in-out;
}

.loader-percentage {
  margin-top: 15px;
  font-size: 16px;
  color: #ffffff;
  font-weight: bold;
}

/* 加入淡入淡出動畫 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
