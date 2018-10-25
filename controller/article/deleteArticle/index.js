const AsyncMysqljs = require('../../../sql/config.js')()

const controller = async (ctx, next) => {
    let {
        article_id
    } = ctx.query

    try {
        await AsyncMysqljs.delete(`delete from blog_articles where article_id = ?;`, [article_id])

        ctx.body = {
            success: true,
            message: '删除成功'
        }
    } catch (err) {
        ctx.body = {
            success: false,
            message: err.sqlMessage
        }
    }
}

module.exports = controller