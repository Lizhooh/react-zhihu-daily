
const STARTINIT = {
    loading: true,
    stop: false,
};

export const start = (start = STARTINIT, action) => {
    switch(action.type) {

        case 'init-start': return {
            ...start,
            ...action.data,
            loading: false,
        }

        case 'start-end': return {
            ...start,
            stop: true,
        }

        default: return {
            ...start,
        }
    }
}

const MENUINIT = {
    open: false,
    show: false,
    animatedTime: 240,
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
            if (action.id === 0) return {
                ...state,
                homeSource: {
                    ...state.homeSource,
                    list: [
                        ...state.homeSource.list,
                        action.data
                    ],
                },
            }

            return {
                ...state,
                otherSource: {
                    ...state.otherSource,
                    stories: [
                        ...state.otherSource.stories,
                        ...action.data.stories
                    ],
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
    animatedTime: 300,
    source: {},
    active: 0,
    comment: {
        open: false,
        show: false,
        source: {},
    },
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

        case 'init-Comment': return {
            ...state,
            comment: {
                ...state.comment,
                source: action.data,
            },
        }

        case 'open-Comment': return {
            ...state,
            comment: {
                ...state.comment,
                open: true,
            },
        }

        case 'close-Comment': return {
            ...state,
            comment: {
                ...state.comment,
                open: false,
            },
        }

        case 'show-Comment': return {
            ...state,
            comment: {
                ...state.comment,
                show: true,
            },
        }

        case 'hide-Comment': return {
            ...state,
            comment: {
                ...state.comment,
                source: {},
                show: false,
            },
        }

        default: return {
            ...state,
        }
    }
}