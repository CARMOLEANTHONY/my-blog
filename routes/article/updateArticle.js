const router = require('koa-router')()

const controller = require('../../controller/article/updateArticle/index')

router.post('/updateArticle',  (ctx, next) => controller(ctx, next))

module.exports = router