<template>
  <div class="container">

    <el-row class="to_add">
      <router-link :to="`/articles/edit?id=${id}`">发表文章</router-link>
    </el-row>

    <el-card class="list_card">
      <div v-if="list.length > 0">
        <el-row v-for="(item, index) in list" :key="index" class="item_style">
          <el-col :span="13" class="pointer ellipse" @click.native="goDetail(item.article_id)">{{item.title}}
          </el-col>
          <el-col :span="5" :offset="1">{{item.author_name}}</el-col>
          <el-col :span="5">{{item.create_time | parseDate}}</el-col>
        </el-row>
        <el-row>
          <el-col @click.native="getMore" class="to_add">点击加载更多</el-col>
        </el-row>
      </div>
      <el-row v-else class="t_center">暂未发表文章</el-row>
    </el-card>

  </div>
</template>
<script>
  export default {
    name: "home",
    data() {
      return {
        id: this.$store.state.userInfo.userInfo.id,
        content: "",
        title: "",
        list: [],
        page: 1
      };
    },
    created() {
      this.getArticleList(this.page)
    },
    methods: {
      getArticleList(page) {
        const params = {
          page,
          size: 10
        };

        this.$fetch
          .get("/getArticleList", {
            params
          })
          .then(res => {
            if (res.data.success) {
              if (res.data.list.length > 0) {
                this.list.push(...res.data.list)
              } else {
                this.$msg.warning('没有更多文章了')
                this.page--;
              }
            }
          });
      },
      getMore() {
        this.getArticleList(++this.page)
      },
      goDetail(article_id) {
        this.$router.push({
          path: '/articles/detail',
          query: {
            article_id
          }
        })
      }
    }
  };

</script>
<style lang="scss" scoped>
  .container {
    width: 100%;
    height: 100%;
    // background-image: radial-gradient(ellipse at 50% 50%, #ffffff, #cdcdcd 80%, #00ff00);
    // background: url('../../assets/images/home_bg.jpg') no-repeat center center;
    // background-size: cover;

    .list_card {
      min-width: 500px;
      max-width: 1000px;
      margin: 0 auto;
    }

    .item_style {
      padding: 20px 0 10px;
      border-bottom: 1px solid #dedede;
    }

    .to_add {
      text-align: center;
      margin: 20px 0;
    }
  }

</style>
