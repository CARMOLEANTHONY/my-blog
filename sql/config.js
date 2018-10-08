const Sql = require('mysql')

const defaultConfig = {
    connectionLimit : 1000,
    connectTimeout  : 60 * 60 * 1000,
    aquireTimeout   : 60 * 60 * 1000,
    timeout         : 60 * 60 * 1000,
    user: 'root',
    port: 3306,
    password: '162458...',
    database: 'BLOG',
    host: '127.0.0.1',
    multipleStatements: true
}

const AsyncMysqljs = function (config = defaultConfig) {
    const pool = Sql.createPool(config)
    const q = function (sql, values) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, conn) => {
                if (err) return reject(err)
                conn.query(sql, values, (err, rows) => {
                    if (err) reject(err)
                    else resolve(JSON.parse(JSON.stringify(rows)))
                    conn.release()
                })
            })
        })
    }

    /*
    从数据库中查询一条数据，返回值是对象，而非数组
    最好在sql语句中加一个唯一的限制条件
    */
    const get = (sql, values) => {
        try {
            return q(sql, values).then(rows => {
                if (rows.length >= 1) {
                    return JSON.parse(JSON.stringify(rows[0]))
                }
            })
        } catch (err) {
            return new Promise((resolve, reject) => {
                reject(err)
            })
        }
    }

    return {
        query: q,
        delete: q,
        update: q,
        insert: q,
        execute: q,
        get
    }
}

module.exports = AsyncMysqljs