const router = require('koa-router')()

const controller = require('../../controller/article/addArticle/index')

router.post('/addArticle',  (ctx, next) => controller(ctx, next))

module.exports = router