<template>
  <div id="app">
    <el-button v-show="$route.path!='/'" @click="logBackIn" class="log_back_in">重新登录</el-button>
    <router-view />
  </div>
</template>

<script>
import { sessionStorageRemove } from "./utils/index";

export default {
  name: "App",
  methods: {
    logBackIn() {
      sessionStorageRemove("userInfo");

      this.$router.push("/");
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
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
