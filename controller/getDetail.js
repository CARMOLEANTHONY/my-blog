const AsyncMysqljs = require('../sql/config.js')()

const controller = async (ctx, next) => {
    let requestParams;

    requestParams = ctx.query

    console.log(requestParams)

    if (!requestParams.article_id) {
        ctx.body = {
            message: '参数错误',
            success: false
        }

        return
    }

    try {
        const res = await AsyncMysqljs.query(`select * from BLOG.blog_articles where article_id = ?;`, [requestParams.article_id])

        ctx.body = {
            success: true,
            detail: res[0]
        }

    } catch (err) {
        ctx.body = {
            success: false,
            list: res.sqlMessage
        }
    }


}

module.exports = controller