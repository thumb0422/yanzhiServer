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

let postApiForm = function (url,formData) {
    return new Promise(function (resolve, reject) {
            // Set the headers
            var headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-length': formData.length,
                'appKey': '7cabc45a12da376c1aa482f65db61b661524635936121'
            }

            // Configure the request
            var options = {
                url: url,
                method: 'POST',
                headers: headers,
                form: formData
            }

            // Start the request
            request(options, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    // Print out the response body
                    console.log(body)
                    resolve(body)
                }else {
                    console.log(error)
                    reject(error)
                }
            })
        }
    )
}

module.exports = {
    httpRequest,
    postApiJson,
    postApiForm,
}