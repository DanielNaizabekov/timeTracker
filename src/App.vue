<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss">
html, body, #app, .app {
  min-height: 100%;
  height: 1px;
}

.app {
  padding: 20px;
}
</style>
