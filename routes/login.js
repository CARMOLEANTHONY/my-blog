const router = require('koa-router')()

const controller = require('../controller/login.js')

router.get('/login',  (ctx, next) => controller(ctx, next))

module.exports = router