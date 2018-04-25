const request = require('request');
const querystring = require('querystring');

let httpRequest = {
    getUrl: function (callback) {
        request('http://www.baidu.com', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                callback(body)
            }
        })
    },

    getUrlParams: function (url, params, callback) {
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                callback(body)
            }
        })
    },

    postUrl: function (url, params, callback) {
        requestData = params
        request({
            url: url,
            method: "POST",
            json: true,
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(requestData)
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log('POST return ------')
                console.log(body)
                callback(response.body)
            } else {
                callback(response)
            }
        });
    }
}


let postApiJson = function (url, headParams, bodyParams) {
    headParams['content-type'] = 'application/json'
    bodyParams = bodyParams
    return new Promise(function (resolve, reject) {
        request({
                url: url,
                method: "POST",
                json: true,
                headers: headParams,
                body: bodyParams,
            },
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    resolve(response.body)
                } else {
                    reject(response)
                }
            }
        );
    });
}

let postApiForm = function (url, headParams, bodyParams) {

    bodyParams = bodyParams
    post_data = querystring.stringify(bodyParams);
    headParams['Content-Type'] = 'application/x-www-form-urlencoded'
    headParams['Content-Length'] = post_data.length
    return new Promise(function (resolve, reject) {
        request({
                url: url,
                method: "POST",
                json: false,
                headers: headParams,
                body: bodyParams,
            },
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    resolve(response.body)
                } else {
                    reject(response)
                }
            }
        );
    });
}

module.exports = {
    httpRequest,
    postApiJson,
    postApiForm,
}