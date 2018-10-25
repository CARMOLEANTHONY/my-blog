const AsyncMysqljs = require('../../../sql/config.js')()

const controller = async (ctx, next) => {

    let {
        comment_id
    } = ctx.query

    let updateProp = {
        is_read: true
    }

    try {
        await AsyncMysqljs.insert(`UPDATE BLOG.comment SET ? WHERE comment_id = ?;`, [updateProp, comment_id])

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