<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router' // ← 要加這行
import Loading from './components/Login.vue'
import AppLayout from './AppLayout.vue'

const isLoading = ref(true)
const router = useRouter()
const route = useRoute()

// 結束後切主畫面，並導回首頁
const finishLoading = () => {
  isLoading.value = false

  // ✅ 進入頁面後若不是首頁，就跳轉回首頁（或 '/about'）
  if (route.path !== '/') {
    router.push('/') // 或 router.replace('/')，你也可以改成 '/about'
  }
}

// Vue 掛載完成後通知 script.js
onMounted(() => {
  console.log('AppLayout 掛載完成，通知 script.js')
  window.dispatchEvent(new Event('vue-app-ready'))
})
</script>

<template>
  <div>
    <!-- 每次都顯示 -->
    <Loading v-if="isLoading" @loading-finish="finishLoading" />

    <!-- 顯示主畫面 -->
    <AppLayout v-else>
      <RouterView />
    </AppLayout>
  </div>
</template>

