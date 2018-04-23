const request = require('request');

let httpRequest = {
    getUrl :function (callback) {
        request('http://www.baidu.com', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                callback(body)
            }
        })
    },

    getUrlParams :function (url,params,callback) {
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                callback(body)
            }
        })
    },

    postUrl :function (callback) {
        requestData = {
            "P1":"p1",
            "P2":"p2",
        }
        request({
            // url: url,
            url : 'http://www.baidu.com',
            method: "POST",
            json: true,
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(requestData)
        }, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log('POST return ------')
                console.log(body)
            }
        });
    }
}


module.exports = httpRequest