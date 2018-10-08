const router = require('koa-router')()

const controller = require('../controller/getDetail/index')

router.get('/getDetail',  (ctx, next) => controller(ctx, next))

module.exports = router