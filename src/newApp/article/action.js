import fetch from 'isomorphic-fetch';

const get = (url) => fetch(url)
    .then(res => res.json())
    .catch(err => console.log(err));

export const openArticle = () => (dispatch, getState) => {
    dispatch({
        type: 'show-Article',
    });

    setTimeout(() => {
        dispatch({
            type: 'open-Article'
        })
    }, 50);
};

export const closeArticle = () => (dispatch, getState) => {
    const { article } = getState();

    dispatch({
        type: 'close-Article',
    });

    setTimeout(() => {
        dispatch({
            type: 'hide-Article',
        });
    }, article.animatedTime);
}

export const initArticle = (aid) => (dispatch, getState) => {
    return get('http://112.74.109.22:3000/zhihu-daily/api/article/' + aid).then(result => {
        dispatch({
            type: 'init-Article',
            data: result,
            active: result.active,
        });
    });
}