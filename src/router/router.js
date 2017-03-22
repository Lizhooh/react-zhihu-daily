import React from 'react';
import {
    browserHistory,
    Router,
    Route,
    IndexRedirect,
} from 'react-router';

import Main from '../newApp/main';

export default () => (
    <Router history={browserHistory} >
        <Route path='/' component={null}>
            <IndexRedirect to='/themes/0' />
            <Route path='/themes/:id' component={Main}>
                <Route path='/themes/:id/article/:aid' component={null}>

                </Route>
            </Route>
        </Route>
    </Router>
);