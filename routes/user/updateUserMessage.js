const router = require('koa-router')()

const controller = require('../../controller/user/updateUserMessage/index')

router.get('/user/updateMessage', (ctx, next) => controller(ctx, next))

module.exports = router