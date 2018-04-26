const imageExtension = require('../utility/imageExtension')
const httpRequest = require('../utility/httpRequest')

let errorCode = {
    '200': '请求成功',
    '100': '未知异常',
    '5000': '上游数据源异常',
    '5001': 'appkey错误',
    '5002': '上游数据源返回数据格式错误',
    '5003': '用户余额不足',
    '5004': 'appkey请求次数超过每天允许请求的次数',
}

async function sendImageRequest(imagefilePath, resolve, reject) {
    let imagefileName = imagefilePath
    return new Promise((resolve, reject) => {
        apihost = 'http://aiopen.datapeak.com.cn'
        apipath = '/proxy/api/face_score_plus'
        apiUrl = apihost + apipath
        let bodyData = {}
        bodyData['img_base64'] = imageExtension.imageEncodeBase64(imagefileName)
        httpRequest.postApiForm(apiUrl, bodyData).then(result => {
            let rspJson = JSON.parse(result)
            if (rspJson.code == 200) {
                resolve(rspJson)
            } else {
                reject({
                    'code': '-1',
                    'msg': errorCode[rspJson.code]
                })
            }
        }).catch(err => {
            reject({
                'code': '-1',
                'msg': 'catch failed'
            })
        })
    })
}

module.exports = {
    sendImageRequest
}