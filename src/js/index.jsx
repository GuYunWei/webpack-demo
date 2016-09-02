import React from 'react';
import ReactDOM from 'react-dom';
import { Router, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';
import { combineReducers, createStore } from 'redux';
import { Provider, connect } from 'react-redux'
import routes from './routes';

const history = useRouterHistory(createHashHistory)({ queryKey: false });

// let reducer = combineReducers({ visibilityFilter, todos });
// let store = createStore(reducer);

ReactDOM.render(
	<Router history={history} onUpdate={() => window.scrollTo(0, 0)} routes={routes} />,
	document.getElementById('root')
);