const AsyncMysqljs = require('../sql/config')()

const controller = async (ctx, next) => {
    let requestParams, success, message

    requestParams = ctx.query

    success = false

    try {
        const res = await AsyncMysqljs.get(`select * from BLOG.user_info where name = ?;`, [requestParams.userName])

        if (res == undefined) {
            message = '用户名不存在'
        } else if (res.password != requestParams.userPsw) {
            message = '密码不正确'
        } else {
            message = '登录成功'
            success = true
            delete res.password
        }

        ctx.body = {
            success,
            message,
            userInfo: res
        }

    } catch (err) {
        ctx.body = {
            success,
            list: err.sqlMessage
        }
    }

}

module.exports = controller