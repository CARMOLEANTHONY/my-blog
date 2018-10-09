const AsyncMysqljs = require('../../sql/config.js')()

const controller = async (ctx, next) => {

    let {
        page,
        size,
        id,
        uId
    } = ctx.query

    if (id) {
        try {

            const res = await AsyncMysqljs.query(`select * from blog_articles where author_id = ? ${id == uId ? '':'and is_private = 0'} limit ?,?; select count(author_id) from blog_articles where author_id = ?${id == uId ? '':' and is_private = 0'};`, [id - 0, (page - 1) * size, page * size, id - 0])

            let count = res[1][0]['count(author_id)']

            ctx.body = {
                success: true,
                page,
                size,
                count,
                list: res[0]
            }

        } catch (err) {
            ctx.body = {
                success: false,
                message: err.sqlMessage
            }
        }
    } else {
        try {

            const res = await AsyncMysqljs.query(`select * from blog_articles where is_private = 0 limit ?,?; select count(*) from blog_articles where is_private = 0;`, [(page - 1) * size, page * size])

            let count = res[1][0]['count(*)']

            ctx.body = {
                success: true,
                count,
                list: res[0],
                page,
                size
            }

        } catch (err) {
            ctx.body = {
                success: false,
                message: err.sqlMessage
            }
        }
    }
}

module.exports = controller