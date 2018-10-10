const AsyncMysqljs = require('../../sql/config.js')()

const controller = async (ctx, next) => {

    let {
        uId,
        article_id
    } = ctx.query

    if (!article_id) {
        ctx.body = {
            message: '参数错误',
            success: false
        }

        return
    }

    try {
        const res = await AsyncMysqljs.get(`select * from BLOG.blog_articles where article_id = ?;`, [article_id])
        
        res.like_user_id_list = res.like_user_id_list == null ? '': res.like_user_id_list
        res.is_like = res.like_user_id_list.indexOf(uId) > -1 ? true : false

        res.commentList = await AsyncMysqljs.query(`SELECT * from comment WHERE parent_id = ? order by comment_time desc`, [article_id])


        ctx.body = {
            success: true,
            detail: res
        }

    } catch (err) {
        ctx.body = {
            success: false,
            list: err.sqlMessage || err
        }
    }


}

module.exports = controller