const router = require('koa-router')()

const controller = require('../../controller/user/getUserMessage/index')

router.get('/user/getMessage',  (ctx, next) => controller(ctx, next))

module.exports = router