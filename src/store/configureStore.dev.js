import { createStore, applyMiddleware, compose } from 'redux'   // 引入redux createStore、中间件及compose 
import thunk from 'redux-thunk'    // redux-thunk 支持 dispatch function，并且可以异步调用它
import createLogger from 'redux-logger'    // 利用redux-logger打印日志
import api from '../middleware/api'
import rootReducer from '../reducers'
import DevTools from '../containers/DevTools'    // 引入DevTools调试组件

const configureStore = preloadedState => {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(thunk, api, createLogger()),
      DevTools.instrument()
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

export default configureStore
