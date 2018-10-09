const router = require('koa-router')()

const controller = require('../controller/getUserList/index')

router.get('/getUserList',  (ctx, next) => controller(ctx, next))

module.exports = router