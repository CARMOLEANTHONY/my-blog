<template>
  <el-dialog :title="title" :visible.sync="addDialogFormVisible" :before-close="beforeCloseHandler" :show-close="needCloseButton">
    <el-form :model="formData" :label-width="labelWidth" v-if="$slots.default == undefined">
      <el-form-item label="用户名">
        <el-input v-model="formData.userName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formData.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="formData.email" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <slot></slot>
    <span slot="footer">
      <el-button @click="cancelHandler" v-if="needCancleButton">取消</el-button>
      <el-button @click="submitHandler" type="primary">提交</el-button>
    </span>
  </el-dialog>
</template>
<script>
  const noop = function () {}
  export default {
    name: 'myDialog',
    data() {
      return {

      }
    },
    props: {
      title: {
        type: String,
        default: '收货地址'
      },
      addDialogFormVisible: {
        type: Boolean,
        default: false
      },
      needCloseButton: {
        type: Boolean,
        default: true
      },
      needCancleButton: {
        type: Boolean,
        default: true
      },
      formData: {
        type: Object,
        default () {
          return {
            userName: '',
            password: '',
            email: ''
          }
        }
      },
      labelWidth: {
        type: String,
        default: '80px'
      },
      onCancelHandler: {
        type: Function,
        default: noop
      },
      onSubmitHandler: {
        type: Function,
        default: noop
      },
      onBeforeCloseHandler: {
        type: Function,
        default: noop
      }
    },
    methods: {
      beforeCloseHandler() {
        this.hideDialog()
        this.$emit('onBeforeCloseHandler', this)
      },
      hideDialog() {
        this.$emit('update:addDialogFormVisible', false)
      },
      cancelHandler() {
        this.hideDialog()
        this.$emit('onCancelHandler', this)
      },
      submitHandler() {
        this.hideDialog()
        this.$emit('onSubmitHandler', this)
      }
    }
  }
</script>
