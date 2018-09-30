<template>
  <div class="container">

    <el-row class="to_add">
      <router-link :to="`/articles/add?id=${id}`">发表文章</router-link>
    </el-row>

    <el-card class="list_card">
      <el-row v-if="list" v-for="(item, index) in list" :key="index" class="item_style">
        <el-col :span="13" class="pointer ellipse">
          <router-link :to="`/articles/detail?article_id=${item.article_id}`">{{item.title}}</router-link>
        </el-col>
        <el-col :span="5" :offset="1">{{item.author_name}}</el-col>
        <el-col :span="5">{{item.create_time | parseDate}}</el-col>
      </el-row>
    </el-card>

  </div>
</template>
<script>
  export default {
    name: "home",
    data() {
      return {
        id: this.$route.query.id,
        content: "",
        title: "",
        list: null
      };
    },
    created() {
      this.getArticleList()
    },
    methods: {
      getArticleList() {
        const params = {
          id: this.id
        };

        this.$fetch
          .get("/getArticleList", {
            params
          })
          .then(res => {
            if (res.data.success) {
              this.list = res.data.list
            }
          });
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
