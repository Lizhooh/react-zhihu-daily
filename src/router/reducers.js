
const MENUINIT = {
    open: true,
    show: true,
    animatedTime: 360,
    source: {},
    active: 13,
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
    ohterSource: {},
    homeSource: {},
    active: 0,
};

export const main = (state = MAININIT, action) => {
    switch (action.type) {

        case 'load-Theme': return {
            ...state,
            [action.id === 0 ? 'homeSource' : 'ohterSource']: action.data,
            active: action.id,
        }

        default: return {
            ...state,
        }
    }
}