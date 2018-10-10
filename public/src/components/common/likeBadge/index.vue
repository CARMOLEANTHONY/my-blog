<template>
  <el-badge :value="valueNum" :max="max" class="pointer badge_style">
    <img :src="isLiked?liked:like" @click="likeToggle">
  </el-badge>
</template>
<script>
  import like from '../../../assets/images/like.png'
  import liked from '../../../assets/images/liked.png'
  export default {
    name: 'likeBadge',
    data() {
      return {
        like,
        liked,
        isLiked: this.is_like,
        valueNum: this.value
      }
    },
    props: {
      max: {
        type: Number,
        default: 99,
        validator: v => parseInt(v)
      },
      value: {
        type: Number,
        default: 0
      },
      aId: {
        type: String
      },
      is_like: {
        typle: Boolean,
        default: false
      },
      likeType: {
        type: String,
        default: 'article'
      }
    },
    methods: {
      likeToggle() {
        let params = {
          aId: this.aId,
          uId: this.$store.state.userInfo.userInfo.id,
          likeType: this.likeType
        }

        this.$fetch.get(`/toggleLike`, {
          params
        }).then(res => {
          this.isLiked ? this.valueNum-- : this.valueNum++
          this.isLiked = !this.isLiked
        })
      }
    }
  }

</script>
<style lang="scss" scoped>
  .badge_style {
    height: 30px;
    line-height: 30px;
    img {
      height: 20px;
      vertical-align: middle;
    }
  }

</style>
