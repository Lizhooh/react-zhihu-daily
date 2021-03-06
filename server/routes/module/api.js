
var VERSION = 4;
var PRO = 'http'

var API = {
    startImage:    'https://news-at.zhihu.com/api/7/prefetch-launch-images/720*1112',
    themeType:     PRO + '://news-at.zhihu.com/api/' + VERSION + '/theme/',
    latest:        PRO + '://news-at.zhihu.com/api/' + VERSION + '/stories/latest',
    latestMore:    PRO + '://news-at.zhihu.com/api/' + VERSION + '/stories/before/',
    themes:        PRO + '://news-at.zhihu.com/api/' + VERSION + '/themes',
    themesMore:    PRO + '://news-at.zhihu.com/api/' + VERSION + '/theme/',
    article:       PRO + '://news-at.zhihu.com/api/' + VERSION + '/story/',
    storyExtra:    PRO + '://news-at.zhihu.com/api/' + VERSION + '/story-extra/',
    longComment:   PRO + '://news-at.zhihu.com/api/' + VERSION + '/story/',
    shortComment:  PRO + '://news-at.zhihu.com/api/' + VERSION + '/story/',
};

module.exports = API;