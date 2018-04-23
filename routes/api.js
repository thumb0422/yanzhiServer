const path = require('path')
const router = require('koa-router')()
const { uploadFile } = require('../utility/upload')

var  httpRequest = require('../utility/httpRequest')
router.prefix('/api')

router.get('/index', async (ctx, next) => {
    let title = '图片上传'
    await ctx.render('uploadIndex', {
        title,
    })
})

router.post('/upload', async (ctx, next) => {
    // 上传文件请求处理
    let result = { success: false }
    // TODO 需要使用绝对路径  https://github.com/imsobear/blog/issues/48
    let serverFilePath = path.join( process.cwd(), 'public/upload/images' )

    // 上传文件事件
    result = await uploadFile( ctx, {
        fileType: 'album',
        path: serverFilePath
    })
    ctx.body = result
})

router.get('/faceApi', async (ctx, next) => {
    ctx.body = {
        'methond': ctx.method,
        'body': (JSON.stringify(ctx.request))
    };
})

router.post('/postTest', async (ctx, next) => {
    httpRequest.getUrl(function (result) {
        console.log('getUrl-----------------return,result = ',result)
    })

    httpRequest.getUrlParams('http://www.baidu.com',{'A1':'aaaa'},function (result) {
        console.log('getUrlParams-----------------return,result = ',result)
    })

    httpRequest.postUrl(function (result) {
        console.log('post-----------------return')
        console.log(result)
    })
    ctx.body = {
        'methond': ctx.method,
        'body':ctx.request.body,
    };
})


module.exports = router