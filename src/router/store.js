import {
    combineReducers,
    applyMiddleware,
    compose,
    createStore
} from 'redux';
import thunk from 'redux-thunk';
import * as reducers from './reducers';

const devtool = (open) => (
    // 开启 redux devtool
    open &&
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
);

const store = createStore(
    combineReducers({
        ...reducers,
    }),
    compose(
        applyMiddleware(thunk),
        devtool(true),
    )
);

export default store;

