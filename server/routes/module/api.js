
var VERSION = 4;
var PRO = 'http'

var API = {
    startImage: PRO + '://news-at.zhihu.com/api/' + VERSION + '/start-image/720*1280',
    themeType:  PRO + '://news-at.zhihu.com/api/' + VERSION + '/theme/',
    latest:     PRO + '://news-at.zhihu.com/api/' + VERSION + '/stories/latest',
    latestMore: PRO + '://news-at.zhihu.com/api/' + VERSION + '/stories/before/',
    themes:     PRO + '://news-at.zhihu.com/api/' + VERSION + '/themes',
    themesMore: PRO + '://news-at.zhihu.com/api/' + VERSION + '/theme/',
    article:    PRO + '://news-at.zhihu.com/api/' + VERSION + '/story/',
};

module.exports = API;