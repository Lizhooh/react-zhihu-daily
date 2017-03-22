import fetch from 'isomorphic-fetch';

const get = (url) => fetch(url)
    .then(res => res.json())
    .catch(err => console.log(err));

export const openMenu = () => (dispatch, getState) => {
    dispatch({
        type: 'show-Menu',
    });

    setTimeout(() => {
        dispatch({
            type: 'open-Menu'
        })
    }, 50);
};

export const closeMenu = () => (dispatch, getState) => {
    const { menu } = getState();

    dispatch({
        type: 'close-Menu',
    });

    setTimeout(() => {
        dispatch({
            type: 'hide-Menu',
        });
    }, menu.animatedTime + 30);
}

export const initMenu = () => (dispatch, getState) => {
    return get('http://localhost:3333/api/themes/').then(result => {
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
        'http://localhost:3333/api/latest/' :
        'http://localhost:3333/api/theme-type/' + id;

    return get(url).then(result => {
        dispatch({
            type: 'load-Theme',
            data: result,
            id: id,
        });
    });
}