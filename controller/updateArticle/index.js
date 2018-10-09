const AsyncMysqljs = require('../../sql/config.js')()

const controller = async (ctx, next) => {

    let requestParams = ctx.request.body

    requestParams.create_time = new Date(requestParams.create_time)

    requestParams.last_rewrite_time = new Date()

    delete requestParams.is_like
    delete requestParams.commentList

    try {
        await AsyncMysqljs.insert(`UPDATE BLOG.blog_articles SET ? WHERE article_id = ?;`, [requestParams, requestParams.article_id])

        ctx.body = {
            success: true,
            message: '修改成功！'
        }
    } catch (err) {

        ctx.body = {
            success: false,
            message: err.sqlMessage
        }

    }

}

module.exports = controller