
const MENUINIT = {
    open: false,
    show: false,
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

        // 加载更多
        case 'load-Theme-More': {
            if(action.id === 0) return {
                ...state,
                homeSource: {
                    ...state.homeSource,
                    list: [...state.homeSource.list, action.data],
                },
            }

            console.log(action.data);

            return {
                ...state,
                otherSource: {
                    ...state.otherSource,
                    stories: [...state.otherSource.stories, ...action.data.stories],
                },
            }
        }

        default: return {
            ...state,
        }
    }
}


const ARTICLEINIT = {
    open: false,
    show: false,
    animatedTime: 360,
    source: {},
    active: 0,
};

export const article = (state = ARTICLEINIT, action) => {

    switch (action.type) {
        case 'init-Article': return {
            ...state,
            source: action.data,
            active: action.active,
        }

        case 'open-Article': return {
            ...state,
            open: true,
        }

        case 'close-Article': return {
            ...state,
            open: false,
        }

        case 'show-Article': return {
            ...state,
            show: true,
        }

        case 'hide-Article': return {
            ...state,
            source: {},
            show: false,
        }

        default: return {
            ...state,
        }
    }
}