const execSql = require('./mysql')

let findAllUser = function () {
    let  _sql = `
        SELECT * FROM user
    `
    return execSql.query(_sql)
}

// 注册用户
let insertData = (value) => {
    let _sql = "insert into user set email=?,password=?,name=?,nick=?;"
    return execSql.query(_sql, value)
}

module.exports={
    findAllUser,
    insertData
}