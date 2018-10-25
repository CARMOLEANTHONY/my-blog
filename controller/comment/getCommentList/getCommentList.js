const AsyncMysqljs = require('../../../sql/config.js')()
const querySubCommentList = require('./querySubCommentList.js')

const getCommentList = async (articleId, uId, page, size) => {

    try {

        page = page ? page = Number(page) : null
        size = size ? size = Number(size) : null

        let sql = `SELECT c.content, c.comment_id commentId, c.user_id commenterId, c.user_name commenterName, c.parent_id parentCommentId, c.comment_time commentTime, c.article_id articleId, c.like_num likeNum, c.like_user_id_list likeUserIdList from comment c WHERE article_id = ? and parent_id is null order by comment_time desc`

        sql = page ? `${sql} limit ?,?` : sql

        let list = await AsyncMysqljs.query(sql, [articleId, (page - 1) * size, size])
        let count = await AsyncMysqljs.query(`select count(*) from comment where article_id = ? and parent_id is null`, [articleId])

        if (list.length > 0) {
            let len = list.length

            for (let i = 0; i < len; i++) {
                let item = list[i]

                item.likeUserIdList = item.likeUserIdList == null ? '' : item.likeUserIdList

                item.isLiked = item.likeUserIdList.indexOf(uId) > -1 ? true : false

                item.commentList = await querySubCommentList(item.commentId)
            }
        }

        return {
            page,
            size,
            list,
            count: count[0]['count(*)']
        }
    } catch (err) {
        return err.code
    }
}


module.exports = getCommentList