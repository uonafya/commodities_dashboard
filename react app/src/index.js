import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Router, Route, hashHistory } from 'react-router-dom';
// import { HashRouter, Route, NavLink } from 'react-router-dom';

import Sidebar from './Sidebar';
// import App from './App';
import Dashboard from './Dashboard';
import SCPSummary from './SCPSummary';

import * as serviceWorker from './serviceWorker';


ReactDOM.render(<Sidebar />, document.getElementById('sidebr'));

ReactDOM.render(
    <HashRouter>
        <div>
            <Route exact path="/" component={Dashboard}/>
            <Route exact path="/scpsummary" component={SCPSummary}/>
        </div>
    </HashRouter>,
    document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
