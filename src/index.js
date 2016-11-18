import React from 'react'
import { render } from 'react-dom'
import { createHashHistory } from 'history'
import { browserHistory, useRouterHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'  // 利用react-router-redux提供的syncHistoryWithStore我们可以结合store同步导航事件
import Root from './containers/Root'
import configureStore from './store/configureStore'
import moment from 'moment'
import 'moment/locale/zh-cn' // 推荐在入口文件全局设置 locale 对日期控件进行处理
moment.locale('zh-cn')

const store = configureStore()
// const history = syncHistoryWithStore(browserHistory, store)
const hashHistory = useRouterHistory(createHashHistory)({ queryKey: false })
const history = syncHistoryWithStore(hashHistory, store)

render(
  <Root store={store} history={history} />,
  document.getElementById('root')
)