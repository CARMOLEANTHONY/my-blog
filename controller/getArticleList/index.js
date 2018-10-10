const AsyncMysqljs = require('../../sql/config.js')()

const controller = async (ctx, next) => {

    let {
        page,
        size,
        id,
        uId,
        searchValue
    } = ctx.query

    let fuzzyQuerySql = searchValue ? ` and (title like '%${searchValue}%' or content like '%${searchValue}%' or author_name like '%${searchValue}%' or create_time like '%${searchValue.replace(/(\/|\.)/g, '-')}%')` : ''

    if (id) {
        try {

            let privateSql = id == uId ? '' : ' and is_private = 0'

            let sql = `select * from blog_articles where author_id = ?${privateSql}${fuzzyQuerySql} order by last_rewrite_time desc limit ?,?; select count(author_id) from blog_articles where author_id = ?${privateSql}${fuzzyQuerySql};`

            const res = await AsyncMysqljs.query(sql, [id - 0, (page - 1) * size, size - 0, id - 0])

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

            const res = await AsyncMysqljs.query(`select * from blog_articles where is_private = 0${fuzzyQuerySql} order by last_rewrite_time desc limit ?,?; select count(*) from blog_articles where is_private = 0${fuzzyQuerySql};`, [(page - 1) * size, size - 0])

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