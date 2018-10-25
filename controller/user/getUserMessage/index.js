const AsyncMysqljs = require('../../../sql/config.js')()

const controller = async (ctx, next) => {

    try {

        let {
            uId
        } = ctx.query

        let sql = `select comment.content,comment.comment_time,comment.comment_id,comment.user_name,user_info.name,blog_articles.title,blog_articles.article_id FROM comment,user_info,blog_articles WHERE comment.comment_user_id = ? AND comment.is_read = 0 AND user_info.id = ? AND blog_articles.article_id = comment.article_id;`

        const res = await AsyncMysqljs.query(sql, [uId, uId])

        ctx.body = {
            success: true,
            list: res
        }

    } catch (err) {
        ctx.body = {
            success: false,
            message: err.code || err
        }
    }
}

module.exports = controller