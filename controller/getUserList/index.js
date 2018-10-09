const AsyncMysqljs = require('../../sql/config.js')()

const controller = async (ctx, next) => {

    try {

        const res = await AsyncMysqljs.query(`select id,name from user_info;`)

        ctx.body = {
            success: true,
            list: res
        }

    } catch (err) {
        ctx.body = {
            success: false,
            message: err.sqlMessage || err
        }
    }
}

module.exports = controller