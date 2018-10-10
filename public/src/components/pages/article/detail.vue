<template>
  <div class="detail">
    <el-card>
      <el-row v-if="detail.title" class="t_center row_style">{{detail.title}}</el-row>
      <el-row>
        <el-col>作者：{{detail.author_name}}</el-col>
      </el-row>
      <el-row v-if="detail.create_time">
        <el-col :span="12">发表时间：{{detail.create_time | parseDate}}</el-col>
        <el-col :span="12" class="t_right">最后修改时间：{{detail.last_rewrite_time | parseDate}}</el-col>
      </el-row>
      <div v-if="detail.content" class="content_style show_pre" v-highlight v-html="detail.content">
      </div>
      <el-row>
        <el-col :span="12">
          <el-button v-if="canDelete" size="small" @click="deleteArticle">删除</el-button>
          <el-button v-if="canDelete" size="small" @click="edit">编辑</el-button>
          <el-button size="small" @click="back">返回主页</el-button>
          <el-button size="small" @click="comment">评论</el-button>
        </el-col>
        <el-col :span="12" class="t_right">
          <like-badge :value="detail.like_num" :aId="article_id" v-if="detail.like_num != undefined" :is_like="detail.is_like"></like-badge>
        </el-col>
      </el-row>
      <el-row>
        <q-editor ref="comment" :editorOption="editorOption"></q-editor>
      </el-row>
      <comment-list :commentList="detail.commentList" v-highlight class="show_pre"></comment-list>
    </el-card>
  </div>
</template>
<script>
  import like from '../../../assets/images/like.png'
  import liked from '../../../assets/images/liked.png'
  import likeBadge from '../../common/likeBadge/index'
  import commentList from '../../common/commentList/index'
  import qEditor from '../../common/editor/index'
  export default {
    name: 'articleDetail',
    data() {
      return {
        article_id: this.$route.query.article_id,
        detail: {},
        like,
        liked,
        commentContent: '',
        editorOption: {
          placeholder: '点击输入评论'
        }
      }
    },
    components: {
      likeBadge,
      commentList,
      qEditor
    },
    created() {
      this.getDetails()
    },
    computed: {
      canDelete() {
        return this.$store.state.userInfo.userInfo.id == this.detail.author_id
      },
      isLiked() {
        return this.detail
      }
    },
    methods: {
      back() {
        this.$router.push('/home')
      },
      comment() {
        this.commentContent = this.$refs.comment.currentContent
        this.$refs.comment.setContent('')

        if (!this.commentContent) return this.$msg.warning('评论不可为空')

        let params = {
          content: this.commentContent,
          parent_id: this.article_id,
          user_id: this.$store.state.userInfo.userInfo.id,
          user_name: this.$store.state.userInfo.userInfo.name
        }

        this.$fetch.post('/comment', params).then(res => {
          this.getDetails()
          this.commentContent = ''
        })
      },
      getDetails() {
        this.$fetch.get(`/getDetail?article_id=${this.article_id}&uId=${this.$store.state.userInfo.userInfo.id}`)
          .then(res => {
            if (res.data.success) {
              this.detail = res.data.detail
            }
          })
      },
      deleteArticle() {
        this.$confirm('Are You Sure You Want To Delete This Article？', 'WARNING!!!', {
          confirmButtonText: 'YES',
          cancelButtonText: 'CANCEL',
          type: 'warning',
          center: true
        }).then(() => {
          this.$fetch.get(`/deleteArticle?article_id=${this.article_id}`).then(res => {
            if (res.data.success) {
              this.$msg.success('删除成功！')
              this.$router.push('/home')
            }
          })
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
