<template>
  <div class="message">
    <el-card v-if="realTimeMessageList.length > 0" class="card" v-for="(item, index) in realTimeMessageList" :key="index"
      @click.native="goArticle(item)">
      <el-row>
        <el-col><span class="name_style">{{item.user_name}}</span> 于 <span class="time_style">{{item.comment_time |
            timeFormat}}</span>在<span class="article_style">{{item.title}}</span>中回复你:</el-col>
      </el-row>
      <el-row>
        <el-col v-html="item.content" v-highlight></el-col>
      </el-row>
    </el-card>
    <el-card class="center no_data" v-if="realTimeMessageList.length == 0">
      <el-row class="t_center pointer" @click.native="goBack">暂无新消息，点击返回上一页</el-row>
    </el-card>
  </div>
</template>
<script>
  export default {
    name: 'messageList',
    data() {
      return {

      }
    },
    computed: {
      realTimeMessageList: function () {
        return this.$store.getters.realTimeMessageList
      }
    },
    methods: {

      goBack() {
        this.$router.go(-1)
      },

      goArticle(item) {

        let {
          article_id,
          comment_id
        } = item

        this.$fetch.get(`/user/updateMessage?comment_id=${comment_id}`).then(res => {
          this.$router.push({
            path: '/articles/detail',
            query: {
              article_id
            }
          })
        })
      }
    }
  }

</script>
<style lang="scss" scoped>
  .message {

    .no_data {
      position: fixed;
    }

    .card {
      min-width: 500px;
      max-width: 1000px;
      margin: 30px auto;
      cursor: pointer;

      .el-card__body {

        .el-input,
        .el-textarea,
        button {
          margin: 0 0 20px;
        }
      }

      .name_style {
        font-weight: 900;
        color: red;
      }

      .time_style {
        font-weight: 900;
        color: gray;
      }

      .article_style {
        font-weight: 900;
        color: greenyellow;
      }
    }
  }

</style>
