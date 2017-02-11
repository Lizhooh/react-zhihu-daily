
var VERSION = 4;
var PRO = 'http'

var API = {
    themes:     PRO + '://news-at.zhihu.com/api/' + VERSION + '/themes',
    startImage: PRO + '://news-at.zhihu.com/api/' + VERSION + '/start-image/720*1280',
    latest:     PRO + '://news-at.zhihu.com/api/' + VERSION + '/stories/latest',
    themeType:  PRO + '://news-at.zhihu.com/api/' + VERSION + '/theme/',
    article:    PRO + '://news-at.zhihu.com/api/' + VERSION + '/story/',
};

module.exports = API;