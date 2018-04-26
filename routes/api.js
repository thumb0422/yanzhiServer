const path = require('path')
const router = require('koa-router')()
const {uploadFile} = require('../utility/upload')
const imageExtension = require('../utility/imageExtension')
const httpRequest = require('../utility/httpRequest')
const faceImageRequest = require('../utility/faceImageRequest')

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
    //再去服务器解析颜值
    //解耦
    await faceImageRequest.sendImageRequest(result.data.pictureUrl).then(result => {
        ctx.body = result
    }).catch(err => {
        ctx.body = err
    })
})

router.post('/postTest', async (ctx, next) => {
    params = ctx.request.body
    apihost = 'http://127.0.0.1:5000'
    apipath = '/order/F2001'
    apiUrl = apihost + apipath
    let headDic = {}
    let bodyDic = ctx.request.body

    await httpRequest.postApiJson(apiUrl, headDic,bodyDic).then(result => {
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
    // apihost = 'http://aiopen.datapeak.com.cn'
    // apipath = '/proxy/api/face_score_plus'
    // apiUrl = apihost + apipath
    // let bodyData = {}
    // bodyData['img_base64'] = imageExtension.imageEncodeBase64('1.png')
    // await httpRequest.postApiForm(apiUrl, bodyData).then(result => {
    //     ctx.body = result
    // }).catch(err => {
    //     ctx.body = {
    //         'status': -1,
    //         'message': '查询出错',
    //         'err': err,
    //     }
    // })

    //解耦
    await faceImageRequest.sendImageRequest().then(result => {
        ctx.body = result
    }).catch(err => {
        ctx.body = {
            'status': -1,
            'message': '查询出错',
            'err': err,
        }
    })
})

module.exports = router