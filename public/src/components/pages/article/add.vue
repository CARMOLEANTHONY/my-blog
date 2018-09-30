<template>
  <div>
    <el-card class="add_card">
      <el-input placeholder="请点击标题" v-model="title" class="title"></el-input>
      <el-input type="textarea" v-model="content" placeholder="请点击输入"></el-input>
      <el-button @click="submit" size="primary">发表</el-button>
    </el-card>
  </div>
</template>
<script>
  export default {
    name: 'articleAdd',
    data() {
      return {
        id: this.$route.query.id,
        content: "",
        title: ""
      }
    },
    created() {},
    methods: {
      submit() {
        let params = {
          content: this.content,
          title: this.title,
          author_id: this.id
        };

        this.$fetch.post("/addArticle", params).then(res => {
          if (res.data.success) {
            this.$msg.success(res.data.message)

            this.$router.push({
                path: '/home',
                query: {
                    id: res.data.author_id
                }
            })
          }
        });
      }
    }
  }

</script>
<style lang="scss" scoped>
  .add_card {
    min-width: 500px;
    max-width: 1000px;
    margin: 30px auto;

    .el-card__body {

      .el-input,
      .el-textarea,
      button {
        margin: 0 0 20px;
      }      
    }
  }

</style>
