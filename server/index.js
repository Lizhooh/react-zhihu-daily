
var path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    logger = require('morgan');

var routes = require('./routes/all');

var app = express();

// app
(function server() {

    this.use(express.static(path.join(__dirname, 'public')));
    this.use(logger('dev'));
    this.use(bodyParser.json());
    this.use(bodyParser.urlencoded({ extended: false }));

    // /api 路径下，允许跨域请求
    this.all('/api/*', function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", '3.3.3');
        // res.header("Content-Type", "application/json;charset=utf-8");
        next();
    });

    // root
    this.get('/', function (req, res) {
        res.send('Hello');
    });

    // routes
    this.use('/api/', routes);

    //  404 or 500
    this
        .use(function (req, res, next) {
            var err = new Error('Not Found.');
            err.status = 404;
            res.status(404).send('404 Not Found.');
        })
        .use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.send('500 Server Error.');
        });

}).call(app);

module.exports = app;
// exports