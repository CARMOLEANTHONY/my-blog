const router = require('koa-router')()

const controller = require('../controller/getArticleList.js')

router.get('/getArticleList',  (ctx, next) => controller(ctx, next))

module.exports = router