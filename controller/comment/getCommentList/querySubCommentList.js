const AsyncMysqljs = require('../../../sql/config.js')()

const getCommentList = async commentId => {

    let sql = `select u.name receiveName, c.content, c.comment_id commentId, c.user_id commenterId, c.user_name commenterName, c.parent_id parentCommentId, c.comment_time commentTime, c.article_id articleId, c.comment_user_id receiveId from comment c, user_info u where c.parent_id = ? and c.comment_user_id = u.id order by c.comment_time desc`

    let commentList

    try {
        commentList = await AsyncMysqljs.query(sql, [commentId])

        if (commentList.length > 0) {
            let len = commentList.length

            for (let i = 0; i < len; i++) {
                commentList[i].commentList = await getCommentList(commentList[i].commentId)
            }
        }
    } catch (err) {
        return err
    }


    return commentList
}

module.exports = getCommentList