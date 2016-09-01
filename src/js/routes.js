import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import List from './components/List';
import Detail from './components/Detail';
import User from './components/User';

const routes = (
	<Route path="/" component={App}>
		<IndexRoute component={List} />
		<Route path="detail/:repo" component={Detail} />
		<Route path="user/:user" component={User} />
	</Route>
);
export default routes;
