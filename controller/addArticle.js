const AsyncMysqljs = require('../sql/config.js')()

const controller = async (ctx, next) => {

    let requestParams = ctx.request.body

    try {
        const res = await AsyncMysqljs.query(` SELECT * from BLOG.user_info where id = ?`, [requestParams.author_id])

        requestParams.author_name = res.length > 0 ? res[0].name : 'admin'
    } catch (err) {
        ctx.body = {
            success: false,
            message: error.sqlMessage
        }

        retrun
    }

    Object.assign(requestParams, {
        create_time: new Date(),
        article_id: `${Date.now()}${parseInt(Math.random() * 89999 + 10000)}`,
        last_rewrite_time: new Date()
    })

    try {
        await AsyncMysqljs.insert(`INSERT INTO BLOG.blog_articles SET ?;`, requestParams)

        ctx.body = {
            success: true,
            author_id: requestParams.author_id,
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