import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'   // 利用Provider可以使我们的 store 能为下面的组件所用
import routes from '../routes'
import DevTools from './DevTools'
import { Router } from 'react-router'

const Root = ({ store, history }) => (
  <Provider store={store}>
    <div>
      <Router history={history} routes={routes} />
      <DevTools />
    </div>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default Root
