
var router = require('express').Router(),
    API = require('./module/api'),
    $http = require('./module/$http');

router
    .get('/', function (req, res, next) {
        res.json({ result: 'ok' }).end();
    })

    // 启动图
    .get('/start-image', function (req, res, next) {
        $http.get(API.startImage, function (err, data) {
            if (err) {
                return void next(err);
            }

            res.json(
                JSON.parse(data || '{ "url": "", "text": "" }')
            ).end();
        });
    })

    // 主题
    .get('/themes', function (req, res, next) {
        $http.get(API.themes, function (err, data) {
            if (err) {
                return void next(err);
            }
            res.json(JSON.parse(data || '{}')).end();
        });
    })

    // 首页
    .get('/latest', function (req, res, next) {
        $http.get(API.latest, function (err, data) {
            if (err) {
                return void next(err);
            }
            res.json(JSON.parse(data || '{}')).end();
        })
    })

    // 主题列表
    .get('/theme-type/:themeId', function (req, res, next) {
        var id = req.params.themeId;

        $http.get(API.themeType + id, function (err, data) {
            if (err) {
                return void next(err);
            }
            res.json(JSON.parse(data || '{}')).end();
        })
    })

    // 文章
    .get('/article/:articleId', function (req, res, next) {
        var id = req.params.articleId;

        $http.get(API.article + id, function (err, data) {
            if (err) {
                return void next(err);
            }
            res.json(JSON.parse(data || '{}')).end();
        })
    })

    ;

module.exports = router;