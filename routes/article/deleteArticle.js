const router = require('koa-router')()

const controller = require('../../controller/article/deleteArticle/index')

router.get('/deleteArticle',  (ctx, next) => controller(ctx, next))

module.exports = router