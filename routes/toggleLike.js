const router = require('koa-router')()

const controller = require('../controller/toggleLike/index.js')

router.get('/toggleLike',  (ctx, next) => controller(ctx, next))

module.exports = router