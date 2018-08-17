const router = require('koa-router')()

router.get('/user/login', async (ctx, next) => {
  ctx.body = {
    succuss: true
  }
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
