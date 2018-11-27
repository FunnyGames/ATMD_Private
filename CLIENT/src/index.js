import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter  as Router, Route, Link} from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import './index.css';
import App from './App';
import Home from './routes/Home';
import Login from './routes/Login';
import Reset from './routes/Reset';

ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={App} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/reset" component={Reset} />
        </div>
    </Router>
        , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();