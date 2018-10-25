<template>
  <div class="comment_list">
    <div v-for="(item, index) in commentList" :key="index" class="comment_list_item">
      <el-row>
        <el-col :span="20"><span class="import_font_style">{{item.commenterName | filterMyself}}</span>  #{{commentList.length - index}}楼</el-col>
        <el-col :span="4">{{item.commentTime | parseDate}}</el-col>
      </el-row>
      <div class="dashed_bottom">
        <div v-html="item.content" @dblclick="reply(item)" class="comment_centent_style" v-highlight></div>
        <sub-editor :editVisible.sync="item.visible" :params="item" :currentIndex="index"></sub-editor>
      </div>
      <div class="sub_list_box">

        <transition @before-enter="beforeEnterHandler" @enter="enterHandler" @leave="leaveHandler" :duration="1000">
          <div v-show="item.showMoreSubComment">
            <sub-list v-if="item.commentList.length>0" :list="item.commentList" :currentIndex="index"></sub-list>
          </div>
        </transition>
        <div v-if="item.commentList.length>0" @click="item.showMoreSubComment = !item.showMoreSubComment" class="more_comment t_center pointer">{{item.showMoreSubComment?
          '隐藏评论': '更多评论'}}</div>
      </div>
      <el-row type="flex" justify="space-between">
        <el-col>
          <like-badge :aId="item.commentId" :value="item.likeNum" :isLike="Boolean(item.isLiked)" likeType="comment"></like-badge>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  import likeBadge from '../likeBadge/index'
  import subEditor from '../subEditor/index'
  import subList from './subList'
  export default {
    name: 'commentList',
    data() {
      return {
        showMoreSubComment: false
      }
    },
    components: {
      likeBadge,
      subEditor,
      subList
    },
    computed: {
      showMoreText() {
        return this.showMoreSubComment ? '更多评论' : '隐藏评论'
      }
    },
    props: {
      commentList: {
        type: Array,
        default: () => []
      }
    },
    methods: {
      reply(item) {

        if (item.visible) return

        item.visible = true
      },
      beforeEnterHandler(el) {
        el.style.height = '0px'
      },
      enterHandler(el, done) {
        el.style.height = "100%"
        done()
      },
      leaveHandler(el, done) {
        el.style.height = '0px'
        done()
      }
    }
  }

</script>
<style scoped>
  .comment_list {
    border-top: 1px solid #dedede;
  }

  .comment_list_item {
    border-bottom: 1px solid #dedede;
    padding: 20px 0 10px;
    font-size: 14px;
  }

  .comment_centent_style {
    padding: 10px 30px;
  }

  .sub_list_box {
    padding: 10px 30px;
  }

  .more_comment {
    line-height: 40px;
  }

</style>
