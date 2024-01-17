<template>
  <div class="base-loader">
    <Vue3Lottie :animationData="LoadingJSON" :height="200" :width="200" />
  </div>
</template>

<script setup>
  import LoadingJSON from "@/assets/loading.json";
</script>

<style lang="scss">
  .base-loader {
  }
</style>