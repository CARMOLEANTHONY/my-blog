<template>
  <div class="detail">
    <el-card>
      <el-row v-if="detail.title" class="t_center row_style">{{detail.title}}</el-row>
      <el-row v-if="detail.create_time">
        <el-col :span="12">发表时间：{{detail.create_time | parseDate}}</el-col>
        <el-col :span="12" class="t_right">最后修改时间：{{detail.last_rewrite_time | parseDate}}</el-col>
      </el-row>
      <el-row v-if="detail.content" class="content_style">{{detail.content}}</el-row>
      <el-row v-if="canDelete" type="flex" justify="end">
        <el-col>
          <el-button size="small" @click="deleteArticle">删除</el-button>
          <el-button size="small" @click="edit">编辑</el-button>
          <el-button size="small" @click="back">返回主页</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
  export default {
    name: 'articleDetail',
    data() {
      return {
        article_id: this.$route.query.article_id,
        detail: {}
      }
    },
    created() {
      this.getDetails()
    },
    computed: {
      canDelete() {
        return this.$store.state.userInfo.userInfo.id == this.detail.author_id
      }
    },
    methods: {
      back() {
        this.$router.push('/home')
      },
      getDetails() {
        this.$fetch.get(`/getDetail?article_id=${this.article_id}`)
          .then(res => {
            if (res.data.success) {
              this.detail = res.data.detail
            }
          })
      },
      deleteArticle() {
        this.$fetch.get(`/deleteArticle?article_id=${this.article_id}`).then(res => {
          if (res.data.success) {
            this.$msg.success('删除成功！')
            this.$router.push('/home')
          }
        })
      },
      edit() {
        this.$router.push({
          path: '/articles/edit',
          query: {
            id: this.$store.state.userInfo.userInfo.id,
            article_id: this.article_id
          }
        })
      }
    }
  }

</script>
<style lang="scss" scoped>
  .detail {
    width: 1000px;
    margin: 0 auto;
    padding: 30px 0 0 0;
    background-color: #fff;
  }

  .row_style {
    margin: 10px 0;
    line-height: 30px;
    font-weight: bold;
    font-size: 20px;
  }

  .content_style {
    padding: 30px 0;
    border-bottom: 1px solid #333;
  }

</style>
