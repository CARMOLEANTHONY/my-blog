<template>
  <div v-show="editVisible" class="sub_edit">
    <q-editor ref="subComment"></q-editor>
    <el-row type="flex" justify="end">
      <el-button size="small" @click="cancel">取消</el-button>
      <el-button size="small" @click="submit">提交</el-button>
    </el-row>
  </div>
</template>
<script>
  import qEditor from '../editor/index'
  export default {
    components: {
      qEditor
    },
    data() {
      return {
        commentContent: ''
      }
    },
    props: {
      editVisible: {
        type: Boolean,
        default: false
      },
      params: {
        type: Object,
        default: () => {}
      },
      currentIndex: null
    },
    methods: {
      cancel() {
        this.$emit('update:editVisible', false)
      },
      submit() {

        this.commentContent = this.$refs.subComment.result;

        if (!this.commentContent) return this.$msg.warning("评论不可为空");

        let params = {
          content: this.commentContent,
          article_id: this.params.articleId,
          user_id: this.$store.getters.getUID,
          user_name: this.$store.getters.getUName,
          comment_user_id: this.params.commenterId,
          parent_id: this.params.commentId
        };

        this.$fetch.post("/comment", params).then(res => {
          this.commentContent = "";
          this.$refs.subComment.setContent("");
          this.$emit('update:editVisible', false)
          this.$store.commit('setUpdateCommentListStatus', true)
          this.$store.commit('setSubmitCommentIndex', this.currentIndex)
          this.params.showMoreSubComment = true
        });
      }
    }
  }

</script>
<style lang="scss" scoped>
  .sub_edit {
    margin: 20px 0;
  }

</style>
