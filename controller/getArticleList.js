const AsyncMysqljs = require('../sql/config.js')()

const controller = async (ctx, next) => {
    let requestParams;

    requestParams = ctx.query

    if (!requestParams.id) {
        ctx.body = {
            message: '参数错误',
            success: false
        }

        return
    }

    try {
        const res = await AsyncMysqljs.query(`select * from BLOG.blog_articles where author_id = ?;`, [requestParams.id])

        res.length > 0 && res.forEach(item => {
            delete item.content
        });

        ctx.body = {
            success: true,
            list: res
        }

    } catch (err) {
        ctx.body = {
            success: false,
            list: res.sqlMessage
        }
    }


}

module.exports = controller