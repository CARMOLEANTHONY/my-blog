const router = require('koa-router')()

const controller = require('../../controller/article/getArticleList/index')

router.get('/getArticleList',  (ctx, next) => controller(ctx, next))

module.exports = router