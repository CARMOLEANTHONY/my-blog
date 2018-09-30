
const AsyncMysqljs = require('../sql/config')()

const controller = async (ctx, next) => {
    let requestParams, success, message, userInfo

    requestParams = ctx.query

    success = false

    const res = await AsyncMysqljs.query(`select * from BLOG.user_info where name = ?;`, [requestParams.userName])

    if (!Array.isArray(res)) {
        success = false,
            message = '数据库异常'
    } else if (res.length === 0) {
        message = '用户名不存在'
        success = false
    } else if (res[0].password != requestParams.userPsw) {
        message = '密码不正确'
        success = false
    } else {
        message = '登录成功'
        success = true,
            userInfo = Object.assign({}, res[0], {
                password: null
            })
    }

    ctx.body = {
        success,
        message,
        userInfo
    }
}

module.exports = controller