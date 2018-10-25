const getCommentList = require('./getCommentList.js')

const controller = async (ctx, next) => {

    let {
        article_id,
        uId,
        page,
        size
    } = ctx.query

    if (!article_id || !uId) {
        ctx.body = {
            message: '参数错误',
            success: false
        }

        return
    }

    try {
        const res = await getCommentList(article_id, uId, page, size)

        ctx.body = {
            success: true,
            ...res
        }

    } catch (err) {
        ctx.body = {
            success: false,
            message: err.code
        }
    }


}

module.exports = controller