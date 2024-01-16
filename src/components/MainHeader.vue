<template>
  <header class="main-header w100 flex flex-between">
    <img src="../assets/TechPort-Logo-2018.png" alt="techport logo" />
    <img src="../assets/NASA-Logo.png" alt="nasa logo" />
  </header>
</template>

<script setup>

</script>

<style lang="scss">
  .main-header {
    @media only screen and (min-width: 0) {
      padding: 8px 12px;
      background-color: #000000;
      img {
        align-self: center;
        &:first-child {
          height: 24px;
        }
        &:last-child {
          height: 40px;
        }
      }
    }
  }
</style>