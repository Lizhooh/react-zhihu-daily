import React from 'react';
import {
    hashHistory,
    Router,
    Route,
    IndexRedirect,
} from 'react-router';

import Main from './main';
import Article from './views/article';
import Comment from './views/comment';
import Popup from './components/toolbar/popup';

export default () => (
    <Router history={hashHistory} >
        <Route path='/' component={null}>
            <IndexRedirect to='/themes/0' />

            <Route path='/themes/:id' component={Main}>

                <Route path='/themes/:id/article/:aid' component={Article} >
                    <Route path='/themes/:id/article/:aid/comment/:n' component={Comment} />
                </Route>

                <Route path='/themes/:id/popup' component={Popup} />
            </Route>
        </Route>
    </Router>
);