import React from 'react';
import ReactDOM from 'react-dom';
import { Router, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';
import routes from './routes'

const history = useRouterHistory(createHashHistory)({ queryKey: false });

ReactDOM.render(
	<Router history={history} onUpdate={() => window.scrollTo(0, 0)} routes={routes} />,
	document.getElementById('root')
)