const AsyncMysqljs = require('../../sql/config.js')()

const controller = async (ctx, next) => {

    let {
        aId,
        uId,
        likeType
    } = ctx.query

    let table, tableCol;

    switch (likeType) {
        case 'article':
            table = 'blog_articles'
            tableCol = 'article_id'
            break;
        case 'comment':
            table = 'comment'
            tableCol = 'comment_id'
            break;
    }

    try {
        let likeStr, index, likeNum;

        const res = await AsyncMysqljs.get(`SELECT like_num, like_user_id_list from ${table} WHERE ${tableCol} = ?;`, [aId])

        likeNum = parseInt(res.like_num)
        likeStr = res.like_user_id_list == null ? '' : res.like_user_id_list
        index = likeStr.indexOf(uId)

        if (index >= 0) {
            let reg = new RegExp(`(${uId}|,${uId})`, 'g')
            likeStr = likeStr.replace(reg, '')
            likeNum--
        } else {
            likeStr = likeStr.concat(likeStr.length > 0 ? `,${uId}` : `${uId}`)
            likeNum++
        }

        let updateData = {
            like_num: likeNum,
            like_user_id_list: likeStr
        }

        await AsyncMysqljs.update(`UPDATE ${table} SET ? WHERE ${tableCol} = ?`, [updateData, aId])


        ctx.body = {
            success: true,
            message: '操作成功！'
        }
    } catch (err) {
        ctx.body = {
            success: false,
            message: err.code || err
        }
    }

}

module.exports = controller