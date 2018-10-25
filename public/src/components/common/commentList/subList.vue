<template>
  <div class="sub_comment_list">
    <div v-for="(item, index) in list" :key="index" class="item_style">
      <div class="reply_title"><span class="import_font_style">{{item.commenterName | filterMyself}}</span> 回复 <span
          class="import_font_style">{{item.receiveName | filterMyself}}:</span> <span class="fr">{{item.commentTime |
          parseDate}}</span></div>
      <div class="dashed_bottom">
        <div v-html="item.content" class="content_style" @dblclick="reply(item)" v-highlight></div>
        <sub-editor :editVisible.sync="item.visible" :params="item" :currentIndex="currentIndex"></sub-editor>
      </div>

      <sub-list v-if="item.commentList.length > 0" :list="item.commentList" :currentIndex="currentIndex"></sub-list>
    </div>
  </div>
</template>
<script>
  import subEditor from '../subEditor/index'
  export default {
    name: 'subList',
    components: {
      subEditor
    },
    data() {
      return {

      }
    },
    props: {
      list: {
        type: Array,
        default: () => []
      },
      currentIndex: null
    },
    methods: {
      reply(item) {

        if (item.visible) return

        item.visible = true
      }
    }
  }

</script>
<style lang="scss" scoped>
  .sub_comment_list {
    .item_style {
      padding: 10px 0 0 0;
    }

    .content_style {
      padding: 10px;
    }
  }

</style>
