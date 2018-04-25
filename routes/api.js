const path = require('path')
const router = require('koa-router')()
const {uploadFile} = require('../utility/upload')
const imageExtension = require('../utility/imageExtension')

var httpRequest = require('../utility/httpRequest')
router.prefix('/aliyun/api')

router.get('/test', async (ctx, next) => {
    let title = 'test'
    await ctx.render('testApi', {
        title,
    })
})

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

router.post('/postTest', async (ctx, next) => {
    await httpRequest.postApiJson('http://127.0.0.1:5000/order/F2001', ctx.request.body).then(result => {
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

router.post('/faceapi', async (ctx, next) => {
    params = ctx.request.body
    apihost = 'http://aiopen.datapeak.com.cn'
    apipath = '/proxy/api/face_score_plus'
    apiUrl = apihost + apipath
    // apiUrl = 'http://127.0.0.1:5000/order/F2001'
    let headDic = {'appKey': '7cabc45a12da376c1aa482f65db61b661524635936121'}
    let bodyDic = ctx.request.body
    bodyDic['img_base64'] = imageExtension.imageEncodeBase64('1.png')
    await httpRequest.postApiForm(apiUrl, headDic, bodyDic).then(result => {
        ctx.body = {
            'status': result.status,
            'message': result.message,
            'count': resul.count,
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