const router = require('koa-router')()

const controller = require('../controller/addArticle.js')

router.post('/addArticle',  (ctx, next) => controller(ctx, next))

module.exports = router