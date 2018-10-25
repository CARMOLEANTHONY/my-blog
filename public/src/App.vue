<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: "App",
  };

</script>

<style>
  #app {
    font-family: "微软雅黑";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  .log_back_in {
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 99;
  }

</style>
