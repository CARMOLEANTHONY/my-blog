const router = require('koa-router')()

const controller = require('../../controller/user/getUserList/index')

router.get('/user/getList',  (ctx, next) => controller(ctx, next))

module.exports = router