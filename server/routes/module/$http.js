
var http = require('http'),
    iconv = require('iconv-lite'),
    bufferhelper = require('bufferhelper');

var get = function (url, callback) {

    if (typeof callback !== 'function') {
        throw new Error(arguments[3] + ' is not a function.');
        return;
    }

    http
        .get(url, function ($res) {
            var bufferHelper = new bufferhelper();

            $res.on('data', function (chunk) {
                bufferHelper.concat(chunk);
            });

            $res.on('end', function () {
                var body = iconv.decode(bufferHelper.toBuffer(), 'utf8');

                callback(null, body);
            });

            $res.on('error', function (err) {
                callback(err, null);
                err && console.error('$res err', JSON.stringify(err, null, 4));
            })
        })

        .on('error', function (err) {
            callback(err, null);
            err && console.error('http get err', JSON.stringify(err, null, 4));
        });
};

module.exports = {
    get: get,
};