const router = require('koa-router')()

const controller = require('../../controller/comment/getCommentList/index')

router.get('/comment/getList', (ctx, next) => controller(ctx, next))

module.exports = router