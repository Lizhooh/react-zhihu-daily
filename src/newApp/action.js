import fetch from 'isomorphic-fetch';

// const host = 'http://127.0.0.1:3333';
const host = 'http://192.168.155.1:3333';

const get = (url) => fetch(url)
    .then(res => res.json())
    .catch(err => console.log(err));

export const initStart = () => (dispatch, getState) => {
    return get(`${host}/api/start-image`).then(result => {
        dispatch({
            type: 'init-start',
            data: result.creatives[0] || { url: 'http://112.74.109.22/bg.jpg' },
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
    return get(`${host}/api/theme/`).then(result => {
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
        `${host}/api/latest/` :
        `${host}/api/theme-type/` + id;

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
        `${host}/api/latest-more/${last}` :
        `${host}/api/theme-type-more/${id}/${last}`;

    return get(url).then(result => {
        return dispatch({
            type: 'load-Theme-More',
            data: result,
            id: id,
        });
    });
}
