<template>
  <!-- 整體佈局 -->
  <div class="layout">
    <!-- 導覽列 -->
    <header class="navbar">
      <div class="navbar-inner">
        <div class="navbar-logo">
          <span class="logo-icon">個人履歷</span>
          <span></span>
        </div>

        <button class="menu-btn" @click="toggleMobileMenu">☰</button>

        <nav class="nav-links" :class="{ open: isMobileMenuOpen }">
          <RouterLink v-for="item in menuList" :key="item.path" :to="item.path" class="nav-item"
            :class="{ active: isActive(item.path) }" @click="isMobileMenuOpen = false">
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
      Copyright © 2025 Created by Ziv.
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isActive = (path) => route.path === path

const isMobileMenuOpen = ref(false)
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const handleResize = () => {
  if (window.innerWidth > 992) isMobileMenuOpen.value = false
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  handleResize()
})
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

const menuList = [
  { path: '/', name: '自我介紹' },
  { path: '/CramPath', name: '學習歷程' },
  { path: '/Experience', name: '工作經歷' },
  { path: '/Skills', name: '技能經歷' },
]


</script>

<style>



html,
body {
  overflow-y: auto;
  height: 100%;
  color: #333; /* 代替純黑 */

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
  padding: 24px; /* 建議最少 24px 以上 */
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
</style>