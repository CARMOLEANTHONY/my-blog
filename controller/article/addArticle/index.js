const AsyncMysqljs = require('../../../sql/config.js')()

const controller = async (ctx, next) => {

    let requestParams = ctx.request.body

    Object.assign(requestParams, {
        create_time: new Date(),
        article_id: `${Date.now()}${parseInt(Math.random() * 89999 + 10000)}`,
        last_rewrite_time: new Date()
    })

    try {
        await AsyncMysqljs.insert(`INSERT INTO BLOG.blog_articles SET ?;`, requestParams)

        ctx.body = {
            success: true,
            message: '发表成功！'
        }
    } catch (err) {

        ctx.body = {
            success: false,
            message: err.sqlMessage
        }

    }

}

module.exports = controller