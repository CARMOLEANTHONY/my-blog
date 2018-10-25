<template>
  <div class="detail">
    <el-card>
      <el-row v-if="detail.title" class="t_center row_style">{{detail.title}}</el-row>
      <el-row class="font_14" type="flex" justify="space-around">
        <el-col>作者：{{detail.author_name}}</el-col>
        <el-col>阅读量：{{detail.read_count}}</el-col>
        <el-col>发表时间：{{detail.create_time | parseDate}}</el-col>
        <el-col>最后修改时间：{{detail.last_rewrite_time | parseDate}}</el-col>
      </el-row>
      <hr>
      <div class="content_box">
        <div v-if="detail.content" class="content_style show_pre " :class="{max_content_length:getMoreContent}" ref="content"
          v-highlight v-html="detail.content">
        </div>
        <div v-if="needMore" @click="getMoreContent = false;needMore=false" class="get_more_content">查看更多</div>
      </div>
      <el-row>
        <el-col :span="12">
          <el-button v-if="canDelete" size="small" @click="deleteArticle">删除</el-button>
          <el-button v-if="canDelete" size="small" @click="edit">编辑</el-button>
          <el-button size="small" @click="back">返回主页</el-button>
          <el-button size="small" @click="commentStatus = !commentStatus">无脑喷</el-button>
        </el-col>
        <el-col :span="12" class="t_right">
          <like-badge :value="detail.like_num" :aId="article_id" v-if="detail.like_num != undefined" :isLike="detail.is_like"></like-badge>
        </el-col>
      </el-row>
      <div v-show="commentStatus">
        <q-editor ref="comment" :Placeholder="'点击输入评论'"></q-editor>
        <el-row type="flex" justify="end">
          <el-button size="small" @click="cancelComment">取消</el-button>
          <el-button size="small" @click="submitComment">评论</el-button>
        </el-row>
      </div>
      <comment-list :commentList="commentList" class="show_pre"></comment-list>
    </el-card>
  </div>
</template>
<script>
  import like from "../../../assets/images/like.png";
  import liked from "../../../assets/images/liked.png";
  import likeBadge from "../../common/likeBadge/index";
  import commentList from "../../common/commentList/index.vue";
  import qEditor from "../../common/editor/index";
  import {
    addProps,
    highLightKeywords
  } from '../../../utils/index'

  export default {
    name: "articleDetail",
    data() {
      return {
        article_id: this.$route.query.article_id,
        detail: {},
        like,
        liked,
        commentContent: "",
        commentStatus: false,
        commentList: [],
        commentPage: 1,
        commentSize: 5,
        getMoreContent: false,
        needMore: false
      };
    },
    components: {
      likeBadge,
      commentList,
      qEditor
    },
    created() {
      this.getDetails();
      this.getCommentlist()
    },
    computed: {
      canDelete() {
        return this.$store.state.userInfo.userInfo.id == this.detail.author_id;
      },
      updateCommentList() {
        return this.$store.state.updateCommentList
      }
    },
    watch: {
      updateCommentList: function (val) {
        if (!val) return

        this.getCommentlist()
      }
    },
    methods: {
      back() {
        this.$router.push("/home")
      },
      cancelComment() {
        this.commentContent = ""
        this.$refs.comment.setContent("")
        this.commentStatus = false
      },
      submitComment() {
        this.commentContent = this.$refs.comment.result;

        if (!this.commentContent) return this.$msg.warning("评论不可为空");

        let params = {
          content: this.commentContent,
          article_id: this.article_id,
          user_id: this.$store.state.userInfo.userInfo.id,
          user_name: this.$store.state.userInfo.userInfo.name,
          comment_user_id: this.detail.author_id
        };

        this.$fetch.post("/comment", params).then(res => {
          this.getCommentlist()
          this.cancelComment()
        });
      },
      getCommentlist() {
        let params = {
          article_id: this.article_id,
          uId: this.$store.getters.getUID,

        }
        this.$fetch.get(
          `/comment/getList`, {
            params
          }).then(res => {
          let commentIndex = this.$store.state.submitCommentIndex

          commentIndex == null ? -1 : commentIndex

          res.data.list.forEach((item, index) => {
            item.showMoreSubComment = commentIndex == index
          });

          this.commentList = addProps(res.data, {
            visible: false
          }).list;

          this.$store.commit('setSubmitCommentIndex', null)
          this.$store.commit('setUpdateCommentListStatus', false)
        })
      },
      getDetails() {
        this.$fetch
          .get(
            `/getDetail?article_id=${this.article_id}&uId=${
            this.$store.state.userInfo.userInfo.id
          }&isReading=1`
          )
          .then(res => {
            this.detail = res.data.detail

            this.$nextTick(() => {
              const flag = this.$refs.content.offsetHeight > 400

              this.needMore = flag
              this.getMoreContent = flag
            })
          });
      },
      deleteArticle() {
        this.$confirm(
          "Are You Sure You Want To Delete This Article？",
          "WARNING!!!", {
            confirmButtonText: "YES",
            cancelButtonText: "CANCEL",
            type: "warning",
            center: true
          }
        ).then(() => {
          this.$fetch
            .get(`/deleteArticle?article_id=${this.article_id}`)
            .then(res => {
              if (res.data.success) {
                this.$msg.success("删除成功！");
                this.$router.push("/home");
              }
            });
        });
      },
      edit() {
        this.$router.push({
          path: "/articles/edit",
          query: {
            id: this.$store.state.userInfo.userInfo.id,
            article_id: this.article_id
          }
        });
      }
    }
  };

</script>
<style lang="scss" scoped>
  .detail {
    width: 1000px;
    margin: 0 auto;
    padding: 30px 0 0 0;

    .max_content_length {
      max-height: 400px;
      overflow: hidden;
    }

    .content_box {
      position: relative;

      .get_more_content {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 100px;
        background: -webkit-linear-gradient(top, rgba(0, 0, 50, .1) 20%, rgba(0, 0, 50, .8));
        line-height: 100px;
        text-align: center;
        cursor: pointer;
        color: #ff813d;
        font-size: 20px;
      }
    }
  }

  .row_style {
    margin: 20px 0;
    line-height: 30px;
    font-weight: bold;
    font-size: 20px;
  }

  .content_style {
    padding: 30px 0;
    border-bottom: 1px solid #333;
  }

</style>
