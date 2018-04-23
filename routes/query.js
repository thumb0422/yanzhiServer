const router = require('koa-router')();   //路由
const userModel = require('../lib/user')   //数据库方法

router.prefix('/query')

router.get('/users', async (ctx, next) => {
    let resd = ''
    await userModel.findAllUser()
        .then(result => {
            resd = JSON.parse(JSON.stringify(result))
            resd = {
                'status': '0',
                'data': resd,
            }
            console.log(resd)
        }).catch(error => {
            resd = JSON.parse(JSON.stringify(error))
            resd = {
                'status': '-1',
                'data': resd,
            }
            console.log(resd)
        })
    ctx.body = resd
})

router.get('/adduser', async (ctx, next) => {
    let resd = ''
    await userModel.insertData(['email@email.com', 'password2', 'name3', 'nick4'])
        .then(result => {
            resd = {
                'status': '0',
                'message': '注册成功',
                'data': null,
            }
            console.log('注册成功', result)
        }).catch(error => {
            resd = {
                'status': '-1',
                'message': '注册失败',
                'data': null,
            }
            console.log(error)
        })
    ctx.body = resd
})

module.exports = router