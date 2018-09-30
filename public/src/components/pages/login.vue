<template>
  <div class="container">
    <canvas id="cas"></canvas>
    <div class="login_box center">
      <div class="input_box">
        <el-input placeholder="请输入用户" v-model="userName" class="login_el">
          <template slot="prepend">USERNAME</template>
        </el-input>
        <el-input placeholder="请输入密码" v-model="userPsw" type="password" class="login_el" @keydown.enter.native="loginHandler">
          <template slot="prepend">PASSWORD</template>
        </el-input>
      </div>

      <el-button type="primary" @click="loginHandler">ENTER</el-button>
    </div>
  </div>
</template>
<script>
  import rainDrop from "../../utils/canvas-raindrop";
  import {
    localStorageSet,
    localStorageGet
  } from '../../utils/index';


  export default {
    name: 'login',
    data() {
      return {
        userName: "",
        userPsw: ""
      };
    },
    created() {
      if (localStorageGet('userName')) this.$router.push('/home')
    },
    mounted() {
      rainDrop()()
    },
    methods: {
      loginHandler() {
        if (!this.userName) return this.$msg({
          message: '请输入用户名',
          type: 'warning'
        })
        if (!this.userPsw) return this.$msg({
          message: '请输入密码',
          type: 'warning'
        })

        let params = {
          userName: this.userName,
          userPsw: this.userPsw
        }

        this.$fetch.get('/login', {
          params
        }).then(res => {

          console.log(res)

          if (res.data.success) {
            this.$msg({
              message: '登录成功。',
              type: 'success'
            })

            localStorageSet('userName', {
              name: params.userName,
              timeStamp: Date.now()
            })

            this.$router.push({
              path: '/home',
              query: {
                id: res.data.userInfo.id
              }
            })
          } else {
            this.$msg.error(res.data.message)
          }
        }).catch(err => {

          console.log(err)

          this.$msg.warning('服务器异常')
        })
      }
    }
  };

</script>
<style lang="scss" scoped>
  .container {
    width: 100%;
    height: 100%;
    background: url("../../assets/images/login_bg.jpeg") no-repeat center center;
    position: relative;
    text-align: center;

    .login_box {
      width: 400px;
      position: absolute;

      .input_box {
        margin-bottom: 25px;
      }
    }
  }

</style>
