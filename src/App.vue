<script setup>
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'
onMounted(async () => {
  AOS.init()
})
</script>

<template>
  <RouterView />
</template>
<style scoped>

</style>
