import React from 'react';
import {
    browserHistory,
    Router,
    Route,
    IndexRedirect,
} from 'react-router';

import Main from '../newApp/main';
import Article from '../newApp/article';
import Popup from '../newApp/toolbar/popup';

export default () => (
    <Router history={browserHistory} >
        <Route path='/' component={null}>
            <IndexRedirect to='/themes/0' />
            <Route path='/themes/:id' component={Main}>
                <Route path='/themes/:id/article/:aid' component={Article} />
                <Route path='/themes/:id/popup' component={Popup} />
            </Route>
        </Route>
    </Router>
);