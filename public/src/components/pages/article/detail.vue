<template>
  <div class="detail">
    <el-card>
      <el-row v-if="detail.title" class="t_center row_style">{{detail.title}}</el-row>
      <el-row v-if="detail.create_time">
        <el-col :span="12">发表时间：{{detail.create_time | parseDate}}</el-col>
        <!-- <el-col :span="12">上次编辑时间：{{detail.create_time | parseDate}}</el-col> -->
      </el-row>
      <el-row v-if="detail.content" class="content_style">{{detail.content}}</el-row>
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
    methods: {
      getDetails() {
        this.$fetch.get(`/getDetail?article_id=${this.article_id}`)
          .then(res => {
            if (res.data.success) {
              this.detail = res.data.detail
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
    background-color: #fff;
  }

  .row_style {
    margin: 10px 0;
    line-height: 30px;
    font-weight: bold;
    font-size: 20px;
  }

  .content_style {
    margin-top: 30px;
  }

</style>
