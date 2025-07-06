<template>
  <div class="layout">
    <!-- 導覽列 -->
    <header class="navbar">
      <div class="navbar-inner">
        <div class="navbar-logo">
          <span class="logo-icon">個人履歷</span>
        </div>

        <button class="menu-btn" @click="toggleMobileMenu">☰</button>

        <nav class="nav-links" :class="{ open: isMobileMenuOpen }">
          <RouterLink
            v-for="item in menuList"
            :key="item.path"
            :to="item.path"
            class="nav-item"
            :class="{ active: isActive(item.path) }"
            @click="isMobileMenuOpen = false"
          >
            {{ item.name }}
            <span v-if="item.sub" class="arrow">▼</span>
          </RouterLink>
        </nav>
      </div>
    </header>

    <!-- 主內容 -->
    <main class="main-content">
      <div class="content-wrapper">
        <slot />
      </div>
    </main>

    <!-- 頁尾 -->
    <footer class="footer">
      Copyright © 2025 Created by Ziv, with the assistance of AI.
      <span class="contact-link" @click="showModal = true">｜聯絡我</span>
    </footer>
    <!-- 彈窗區塊（建議放 Footer 後方）-->
    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <div class="modal">
        <img src="" class="avatar" />
        <h3 class="avatar-name">Ziv</h3>
        <p>
          GitHub：<a href="https://github.com/ziv-dev" target="_blank"
            >ziv-dev</a
          >
        </p>
        <p>Email：<a href="mailto:ziv@example.com">ziv@example.com</a></p>
        <button @click="showModal = false" class="close-btn">關閉</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
const showModal = ref(false);
const route = useRoute();
const isActive = (path) => route.path === path;

const isMobileMenuOpen = ref(false);
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const handleResize = () => {
  if (window.innerWidth > 992) isMobileMenuOpen.value = false;
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
  handleResize();
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

const menuList = [
  { path: "/", name: "自我介紹" },
  { path: "/Educate", name: "教育歷程" },
  { path: "/Experience", name: "工作經歷" },
  { path: "/Skills", name: "技能經歷" },
];
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  background: url('/background.png') no-repeat center center fixed;
  background-size: cover;
  background-attachment: fixed;
}

.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-size: cover;
}

.navbar {
  background: none;
  padding-top: 30px;
  display: flex;
  justify-content: center;
  z-index: 10;
}

/*上排Css*/
.navbar-inner {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fffcfce0;
  padding: 25px 20px;
  width: 100%;
  max-width: 1200px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
}

.navbar-logo {
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 20px;
  gap: 10px;
}

.logo-icon {
  height: 30px;
}

.menu-btn {
  font-size: 26px;
  background: none;
  border: none;
  display: none;
  cursor: pointer;
}

.nav-links {
  display: flex;
  gap: 15px;
  position: static;
  background: none;
  box-shadow: none;
  padding: 0;
  width: auto;
}

.nav-item {
  color: #555;
  text-decoration: none;
  padding: 6px 10px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.nav-item.active,
.nav-item:hover {
  background-color: #dcdcdc;
  font-weight: bold;
  color: #111;
}

.arrow {
  margin-left: 5px;
  font-size: 12px;
}

.main-content {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  padding: 40px 20px;
}

.content-wrapper {
  padding: 24px;
  /* 建議最少 24px 以上 */
  color: #333333;
  background: #fffcfce0;
  padding: 30px;
  border-radius: 6px;
  max-width: 1200px;
  width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
}

.footer {
  text-align: center;
  font-size: 13px;
  padding: 20px;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-style: italic;
}

.section-title {
  padding: 12px 0;
  margin-bottom: 16px;
}

@media (max-width: 992px) {
  .menu-btn {
    display: block;
  }

  .nav-links {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 100%;
    right: 20px;
    background: #fff;
    border-radius: 4px;
    padding: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 200px;
    z-index: 20;
  }

  .nav-links.open {
    display: flex;
  }

  .nav-item {
    margin: 8px 0;
  }

  .navbar-inner {
    width: 100%;
    margin-inline: 20px;
    max-width: 1200px;
  }
}

/* 彈窗覆蓋層 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

/* 彈窗主體 */
.modal {
  backdrop-filter: blur(8px);
  background: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  padding: 24px;
  max-width: 300px;
  text-align: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

/* 頭像圖片 */
.modal .avatar {
  width: 220px;
  height: 220px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 15px;
}

/* 文字與連結樣式 */
.modal p {
  margin: 8px 0;
  font-size: 14px;
}

.modal a {
  color: #007acc;
  text-decoration: underline;
}

/* 關閉按鈕 */
.close-btn {
  margin-top: 15px;
  padding: 6px 12px;
  background-color: #444;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
