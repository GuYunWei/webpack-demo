import React from 'react';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';

import App from './components/App';
import List from './components/List';
import Detail from './components/Detail';
import User from './components/User';

// const history = useRouterHistory(createHashHistory)({ queryKey: false });
// let reducer = combineReducers({ visibilityFilter, todos });
// let store = createStore(reducer);

// const Root = ({ store }) => (
//   <Provider store={store}>
//     <Router history={history} routes={routes}>
//       <Route path="/" component={App} />
//     </Router>
//   </Provider>
// );

export default const routes = (
	<Route path="/" component={App}>
		<IndexRoute component={List} />
		<Route path="detail/:repo" component={Detail} />
		<Route path="user/:user" component={User} />
	</Route>
);
