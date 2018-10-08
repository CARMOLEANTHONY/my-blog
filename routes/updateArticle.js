const router = require('koa-router')()

const controller = require('../controller/updateArticle/index')

router.post('/updateArticle',  (ctx, next) => controller(ctx, next))

module.exports = router