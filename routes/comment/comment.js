const router = require('koa-router')()

const controller = require('../../controller/comment/index')

router.post('/comment',  (ctx, next) => controller(ctx, next))

module.exports = router