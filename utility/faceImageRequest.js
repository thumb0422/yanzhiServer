const imageExtension = require('../utility/imageExtension')
const httpRequest = require('../utility/httpRequest')

async function sendImageRequest (){
    apihost = 'http://aiopen.datapeak.com.cn'
    apipath = '/proxy/api/face_score_plus'
    apiUrl = apihost + apipath
    let bodyData = {}
    bodyData['img_base64'] = imageExtension.imageEncodeBase64('1.png')
    await httpRequest.postApiForm(apiUrl, bodyData).then(result => {
        resolve(result)
    }).catch(err => {
        reject(err)
    })
}

module.exports =  {
    sendImageRequest
}