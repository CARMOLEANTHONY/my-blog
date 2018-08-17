<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click='fetchTest'>请求</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created () {
    console.log(this.$fetch)
  },
  methods: {
    fetchTest () {
      this.$fetch
        .get('/user/login', {
          userName: 'mole',
          userPsw: 162458
        })
        .then(res => console.log(res))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
