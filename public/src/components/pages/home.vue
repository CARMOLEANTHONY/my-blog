<template>
  <div class="container">

    <el-row type="flex" justify="center" class="nav">
      <el-button size="small" @click="toEdit">发表文章</el-button>
      <el-button size="small" @click="allArticle">全部文章</el-button>
      <el-button size="small" @click="myArticle">我的文章</el-button>
      <el-select class="ml_10" v-model="currentAuthorId" placeholder="按作者搜索" @change="handleAuthorChange">
        <el-option v-for="item in userList" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
    </el-row>

    <div class="list_card">
      <el-row class="search_row">
        <el-input placeholder="标题/内容/作者/时间" v-model="searchValue" @keydown.enter.native="fuzzyQuery">
          <el-button slot="append" icon="el-icon-search" @click="fuzzyQuery"></el-button>
        </el-input>
      </el-row>
      <div v-if="detail.list && detail.list.length > 0" class="article_list">
        <el-row class="item_style">
          <el-col :span="10" class="pointer ellipse strong">文章标题</el-col>
          <el-col :span="5" :offset="1" class="ellipse strong">作者</el-col>
          <el-col :span="4" class="strong">发表时间</el-col>
          <el-col :span="4" class="strong">上次修改时间</el-col>
        </el-row>
        <el-row v-for="(item, index) in detail.list" :key="index" class="item_style">
          <el-col :span="10" class="pointer ellipse" @click.native="goDetail(item.article_id)">{{item.title}}
          </el-col>
          <el-col :span="5" :offset="1">{{item.author_name}}</el-col>
          <el-col :span="4">{{item.create_time | parseDate}}</el-col>
          <el-col :span="4">{{item.last_rewrite_time | parseDate}}</el-col>
        </el-row>
        <el-row type="flex" justify="end" class="pagination_style">
          <el-pagination @current-change="handleCurrentChange" :current-page="page" :page-sizes="[4, 5, 6, 7, 8, 9, 10]"
            :page-size="pageSize" @size-change="handleSizeChange" layout="total, sizes, prev, pager, next, jumper"
            :total="detail.count">
          </el-pagination>
        </el-row>
      </div>
      <el-row v-else class="t_center">暂未发表文章</el-row>
    </div>

  </div>
</template>
<script>
  export default {
    name: "home",
    data() {
      return {
        id: this.$store.state.userInfo.userInfo.id,
        detail: {},
        page: 1,
        getAll: true,
        userList: [],
        currentAuthorId: '',
        searchValue: '',
        pageSize: 5,
        noMore: false
      }
    },
    watch: {
      currentAuthorId: {
        handler: function (value) {
          this.page = 1
          this.getAll ? this.getArticleList(this.page) : this.getArticleList(this.page, value)
        },
        immediate: true
      }
    },
    created() {
      this.getUserList()
    },
    methods: {
      allArticle() {
        this.getAll = true
        this.currentAuthorId = ''
      },
      myArticle() {
        this.getAll = false
        this.currentAuthorId = this.$store.state.userInfo.userInfo.id
      },
      fuzzyQuery() {
        this.page = 1
        this.getAll ? this.getArticleList(this.page) : this.getArticleList(this.page, this.currentAuthorId)
      },
      toEdit() {
        this.$router.push({
          path: '/articles/edit',
          query: {
            id: this.id
          }
        })
      },
      handleCurrentChange(val) {
        this.page = val
        this.getArticleList(val, this.getAll ? null : this.currentAuthorId)
      },
      handleSizeChange(val) {
        this.page = 1
        this.pageSize = val
        this.getArticleList(this.page, this.getAll ? null : this.currentAuthorId)
      },
      getArticleList(page, id) {
        const params = {
          page,
          size: this.pageSize,
          uId: this.$store.state.userInfo.userInfo.id,
          searchValue: this.searchValue
        };

        if (id) params.id = id

        this.$fetch
          .get("/getArticleList", {
            params
          })
          .then(res => {
            if (res.data.success) {
              this.detail = res.data
            }
          });
      },
      goDetail(article_id) {
        this.$router.push({
          path: '/articles/detail',
          query: {
            article_id
          }
        })
      },
      getUserList() {
        this.$fetch.get('/getUserList').then(res => {
          if (res.data.success) {
            this.userList = res.data.list
          }
        })
      },
      handleAuthorChange(value) {
        this.getAll = false
      }
    }
  };

</script>
<style lang="scss" scoped>
  .container {
    width: 100%;
    height: 100%;
    position: relative;
    // background-image: radial-gradient(ellipse at 50% 50%, #ffffff, #cdcdcd 80%, #00ff00);
    // background-size: cover;

    .nav {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }

    .list_card {
      position: absolute;
      top: 60px;
      left: 150px;
      right: 150px;
      bottom: 50px;
      padding: 70px 20px;
      box-shadow: 0 0 10px #ccc;
    }

    .article_list {
      overflow-y: scroll;
      height: 100%;
    }

    .pagination_style {
      position: absolute;
      bottom: 20px;
      left: 0;
      width: 100%;
      padding-right: 20px;
    }

    .item_style {
      padding: 20px 0 10px;
      border-bottom: 1px solid #dedede;
    }

    .to_add {
      text-align: center;
      margin: 20px 0;
    }

    .search_row {
      width: 500px;
      position: absolute;
      left: 50%;
      top: 10px;
      transform: translateX(-50%);
    }
  }

</style>
