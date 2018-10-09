const AsyncMysqljs = require('../../sql/config.js')()

const controller = async (ctx, next) => {

    let requestParams = ctx.request.body

    Object.assign(requestParams, {
        comment_time: new Date(),
        comment_id: `${Date.now()}${parseInt(Math.random() * 89999 + 10000)}`,
    })

    try {
        await AsyncMysqljs.insert(`INSERT INTO BLOG.comment SET ?;`, requestParams)

        ctx.body = {
            success: true,
            message: '发表成功！'
        }
    } catch (err) {

        ctx.body = {
            success: false,
            message: err.sqlMessage || err
        }

    }

}

module.exports = controller