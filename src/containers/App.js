import React, { Component, PropTypes } from 'react'
import { Slider } from 'antd'
import '../styles/reset.css'
// import { connect } from 'react-redux'
// import { browserHistory } from 'react-router'
// import Explore from '../components/Explore'
// import { resetErrorMessage } from '../actions'

class App extends React.Component {
    constructor(props){
      super(props)
    }
    render() {
      return (
        <div>
         <Slider
            defaultValue={20, 50} />
        </div>
      );
    }
} 

export default App
