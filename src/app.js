import React from 'react';
import { Provider } from 'react-redux';

import Store from './stores/store';
import Routes from './router';

export default () => (
    <Provider store={Store}>
        <Routes />
    </Provider>
);


