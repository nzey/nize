import axios from 'axios';
import 'babel-polyfill';
import Immutable from 'immutable';
import installDevTools from 'immutable-devtools';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import App from './containers/App';
import Home from './containers/home/Home';
import Plan from './containers/plan/Plan';
import Today from './containers/today/Today';
import Now from './containers/now/Now';
import Review from './containers/review/Review';
import rootReducers from './reducers/index';

import './bundle.scss';

installDevTools(Immutable);

axios.defaults.baseURL = 'http://localhost:5000/api/';

const loggerMiddleware = createLogger();
const createStoreWithMiddleware = applyMiddleware(thunk, loggerMiddleware)(createStore);
const store = createStoreWithMiddleware(rootReducers);

ReactDOM.render(
  <Provider store={store}>
    <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />;
        <Route path="/plan" component={Plan} />
        <Route path="/today" component={Today} />
        <Route path="/now" component={Now} />
        <Route path="/review" component={Review} />
      </Route>
    </Router>
  </Provider>
  , document.getElementById('react-root'));
