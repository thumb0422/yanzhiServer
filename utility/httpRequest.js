const request = require('request');
const querystring = require('querystring');

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
    postApiJson,
    postApiForm,
}