<template>
  <div class="detail_page">
    <el-card class="add_card">
      <el-input placeholder="请点击输入标题" v-model="detail.title" class="title reserve-space"></el-input>
      <q-editor ref="editor"></q-editor>
      <el-row :gutter="20" type="flex" justify="start">
        <el-col :span="3">是否公开</el-col>
        <el-col>
          <template>
            <el-radio v-model="detail.is_private" :label="0">是</el-radio>
            <el-radio v-model="detail.is_private" :label="1">否</el-radio>
          </template>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-button @click="goBack" size="primary">取消</el-button>
        <el-button @click="submit" size="primary" class="ml_10">发表</el-button>
      </el-row>
    </el-card>
  </div>
</template>
<script>
  import qEditor from "../../common/editor/index";
  import eDialog from "../../common//dialog/index";
  export default {
    name: "articleEdit",
    data() {
      return {
        id: this.$route.query.id,
        article_id: this.$route.query.article_id || null,
        detail: {
          title: "",
          content: "",
          is_private: 0
        }
      };
    },
    components: {
      qEditor,
      eDialog
    },
    created() {
      !this.isCreate && this.getDetails();
    },
    computed: {
      isCreate() {
        return this.article_id ? false : true;
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
      submit() {
        this.detail.content = this.$refs.editor.result;

        let params = {
          content: this.detail.content,
          title: this.detail.title,
          author_id: this.id,
          author_name: this.$store.state.userInfo.userInfo.name,
          is_private: this.detail.is_private
        };

        if (!params.title) return this.$msg.error("标题不可为空");
        if (params.title.length > 30) return this.$msg.error("标题太长");
        if (!params.content) return this.$msg.error("内容不可为空");

        if (this.isCreate) {
          this.$fetch.post("/addArticle", params).then(res => {
            if (res.data.success) {
              this.$msg.success(res.data.message);

              this.$router.push("/home");
            }
          });
        } else {
          params = Object.assign(this.detail, params);

          this.$fetch.post("/updateArticle", params).then(res => {
            if (res.data.success) {
              this.$msg.success(res.data.message);

              this.$router.push({
                path: "/articles/detail",
                query: {
                  article_id: this.detail.article_id
                }
              });
            }
          });
        }
      },
      getDetails() {
        this.$fetch.get(`/getDetail?article_id=${this.article_id}`).then(res => {
          if (res.data.success) {
            this.detail = res.data.detail;
            this.$refs.editor.setContent(res.data.detail.content);
          }
        });
      }
    }
  };

</script>
<style lang="scss" scoped>
  .detail_page {
    overflow: hidden;
  }

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
