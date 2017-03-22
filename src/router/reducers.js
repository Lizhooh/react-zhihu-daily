
const MENUINIT = {
    open: true,
    show: true,
    animatedTime: 260,
    source: {},
};

export const menu = (state = MENUINIT, action) => {

    switch (action.type) {
        case 'init-Menu': return {
            ...state,
            source: action.data,
        }

        case 'open-Menu': return {
            ...state,
            open: true,
        }

        case 'close-Menu': return {
            ...state,
            open: false,
        }

        case 'show-Menu': return {
            ...state,
            show: true,
        }

        case 'hide-Menu': return {
            ...state,
            show: false,
        }

        default: return {
            ...state,
        }
    }
}

const MAININIT = {
    otherSource: {},
    homeSource: {},
    active: 0,
};

export const main = (state = MAININIT, action) => {
    switch (action.type) {

        // 加载主题/首页
        case 'load-Theme': return {
            ...state,
            [action.id === 0 ? 'homeSource' : 'otherSource']: action.data,
            active: action.id,
        }

        default: return {
            ...state,
        }
    }
}