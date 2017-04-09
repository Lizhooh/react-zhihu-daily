import fetch from 'isomorphic-fetch';

const get = (url) => fetch(url)
    .then(res => res.json())
    .catch(err => console.log(err));

export const initStart = () => (dispatch, getState) => {
    return get('http://112.74.109.22:3000/zhihu-daily/api/start-image').then(result => {
        dispatch({
            type: 'init-start',
            data: result.creatives[0] || { url: 'http://112.74.109.22/bg.jpg' } ,
        });
    });
}

export const startEnd = () => ({
    type: 'start-end',
})

export const openMenu = () => (dispatch, getState) => {
    dispatch({
        type: 'show-Menu',
    });

    setTimeout(() => {
        dispatch({
            type: 'open-Menu'
        })
    }, 50);
}

export const closeMenu = () => (dispatch, getState) => {
    const { menu } = getState();

    dispatch({
        type: 'close-Menu',
    });

    setTimeout(() => {
        dispatch({
            type: 'hide-Menu',
        });
    }, menu.animatedTime);
}

export const initMenu = () => (dispatch, getState) => {
    return get('http://112.74.109.22:3000/zhihu-daily/api/theme/').then(result => {
        dispatch({
            type: 'init-Menu',
            data: result,
        });
    });
}

export const changMenuSelect = (id) => ({
    type: 'chang-Menu-Select',
    active: id,
})

export const loadTheme = (id) => (dispatch, getState) => {
    const url = id === 0 ?
        'http://112.74.109.22:3000/zhihu-daily/api/latest/' :
        'http://112.74.109.22:3000/zhihu-daily/api/theme-type/' + id;

    return get(url).then(result => {
        if (id === 0) {
            result.list = [{ date: result.date, stories: result.stories }];
            delete result.stories;
            delete result.date;

            return dispatch({
                type: 'load-Theme',
                data: result,
                id: id,
            });
        }
        else {
            return dispatch({
                type: 'load-Theme',
                data: result,
                id: id,
            });
        }
    });
}

export const loadThemeMore = (id, last) => (dispatch, getState) => {
    const url = id === 0 ?
        `http://112.74.109.22:3000/zhihu-daily/api/latest-more/${last}` :
        `http://112.74.109.22:3000/zhihu-daily/api/theme-type-more/${id}/${last}`;

    return get(url).then(result => {
        return dispatch({
            type: 'load-Theme-More',
            data: result,
            id: id,
        });
    });
}
