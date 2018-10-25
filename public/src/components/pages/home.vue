<template>
  <div id="home">
    <el-row type="flex" justify="end" class="top_actions">
      <el-badge :is-dot="realTimeMessageListLength > 0">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <i class="el-icon-more"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="toMessageList">
              <el-badge :value="realTimeMessageListLength" :max="10" class="item">
                消息
              </el-badge>
            </el-dropdown-item>
            <el-dropdown-item command="logBackIn">
              重新登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
         </el-badge>
    </el-row>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>

<script>
  import {
    sessionStorageRemove
  } from "../../utils/index.js";

  export default {
    name: 'home',
    data() {
      return {
        visible: true
      }
    },
    methods: {
      handleCommand(command) {
        this[command]();
      },
      logBackIn() {

        this.$router.push("/");
 
        sessionStorageRemove("userInfo");
      },
      toMessageList() {
        this.$router.push("/messageList");
      }
    },
    created() {},
    computed: {
      realTimeMessageListLength: function () {

        return this.$store.getters.realTimeMessageList.length
      }
    }
  };

</script>

<style scoped>
  #home {
    min-height: 100%;
    position: relative;
    background-color: rgba(245, 245, 245, .7);
  }

  .top_actions {
    position: fixed;
    top: 10px;
    right: 0;
    left: auto;
    padding: 0 30px;
    z-index: 99;
    margin: 0;
  }

  .item {
    margin-right: 20px;
  }

</style>
