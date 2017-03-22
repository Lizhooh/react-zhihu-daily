import React from 'react';
import {
    browserHistory,
    Router,
    Route,
    IndexRedirect,
} from 'react-router';

import Main from '../newApp/main';
import Article from '../newApp/article';

// const Article = (props) => {
//     console.log('??');
//     return (
//         <div style={{
//             position: 'fixed',
//             top: '100px',
//             left: '50px',
//             zIndex: '100000',
//             width: '100px',
//             height: '100px',
//             backgroundColor: 'rgba(1, 1, 1, 0.2)',
//         }}>

//         </div>
//     )
// }

export default () => (
    <Router history={browserHistory} >
        <Route path='/' component={null}>
            <IndexRedirect to='/themes/0' />
            <Route path='/themes/:id' component={Main}>
                <Route path='/themes/:id/article/:aid' component={Article} />
            </Route>
        </Route>
    </Router>
);