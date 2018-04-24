const path = require('path')
const router = require('koa-router')()
const {uploadFile} = require('../utility/upload')

var httpRequest = require('../utility/httpRequest')
router.prefix('/api')

router.get('/index', async (ctx, next) => {
    let title = '图片上传'
    await ctx.render('uploadIndex', {
        title,
    })
})

router.post('/upload', async (ctx, next) => {
    // 上传文件请求处理
    let result = {success: false}
    // TODO 需要使用绝对路径  https://github.com/imsobear/blog/issues/48
    let serverFilePath = path.join(process.cwd(), 'public/upload/images')

    // 上传文件事件
    result = await uploadFile(ctx, {
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
    await httpRequest.postApi('http://127.0.0.1:5000/order/F2001', ctx.request.body).then(result => {
        ctx.body = {
            'status': result.status,
            'message': result.message,
            'count': result.count,
            'data': result.datas,
        }
    }).catch(err => {
        ctx.body = {
            'status': -1,
            'message': '查询出错',
            'count': 0,
            'data': null,
        }
    })
})


module.exports = router