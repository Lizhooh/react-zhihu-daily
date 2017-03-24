
let router = require('express').Router(),
    API = require('./module/api'),
    fetch = require('node-fetch');

const get = (url) => fetch(url)
    .then(res => res.json())
    .catch(err => console.error(err));

router
    .get('/', async (req, res) => {
        res.json({ result: 'ok' });
    })

    // 启动图
    .get('/start-image', async (req, res) => {
        const data = await get(API.startImage);
        res.json(data || {});
    })

    // 首页
    .get('/latest', async (req, res) => {
        const data = await get(API.latest);
        res.json(data || {});
    })

    // 首页更多
    .get('/latest-more/:lastdate', async (req, res) => {
        const data = await get(API.latestMore + req.params.lastdate);
        res.json(data || {});
    })

    // 主题
    .get('/themes', async (req, res) => {
        const data = await get(API.themes);
        res.json(data || {});
    })

    // 主题更多
    .get('/themes-more/:id/:storyid', async (req, res) => {
        const data = await get(API.themesMore + `${req.params.id}/before/${req.params.storyid}`);
        res.json(data || {});
    })

    // 主题列表
    .get('/theme-type/:themeId', async (req, res) => {
        const id = req.params.themeId;
        const data = await get(API.themeType + id);
        res.json(data || {});
    })

    // 文章
    .get('/article/:articleId', async (req, res) => {
        const id = req.params.articleId;
        const data = await get(API.article + id);
        const comment = await get(API.storyExtra + id);
        data.comment = comment;
        res.json(data || {});
    })

    // 评论
    .get('/comments/:articleId', async (req, res) => {
        const id = req.params.articleId;
        const long = await get(API.longComment + id + '/long-comments');
        const short = await get(API.longComment + id + '/short-comments');

        res.json({ long: long.comments, short: short.comments } || {});
    })


module.exports = router;