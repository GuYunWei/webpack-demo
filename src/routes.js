import React from 'react'
import { Route, withRouter } from 'react-router'
import App from './containers/App'
// import UserPage from './containers/UserPage'
// import RepoPage from './containers/RepoPage'

export default
		//在Route配置时使用withRouter这个方法可以以HOC方式注入router对象到Props中，这样我们在进行页面跳转时可以使用: this.props.router.goBack()
		<Route path="/" component={withRouter(App)} />
		  // <Route path="/:login/:name" component={withRouter(RepoPage)} />
		  // <Route path="/:login" component={withRouter(UserPage)} />
		// </Route>
