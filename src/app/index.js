import axios from 'axios';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
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

axios.defaults.baseURL = 'http://localhost:5000/api/';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
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
