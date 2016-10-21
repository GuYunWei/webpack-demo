import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider, connect } from "react-redux";
import expect from "expect";
import deepFreeze from "deep-freeze";

import { createActions, handleAction, combineActions } from 'redux-actions';
const { increment, decrement } = createActions({
  INCREMENT: amount => ({ amount }),
  DECREMENT: amount => ({ amount: -amount }),
})

const reducer = handleAction(combineActions(increment, decrement), {
  next: (state, { payload: { amount } }) => ({ ...state, counter: state.counter + amount }),
  throw: state => ({ ...state, counter: 0 }),
}, { counter: 10 })

expect(reducer(undefined, increment(1))).toEqual({ counter: 11 })
expect(reducer(undefined, decrement(1))).toEqual({ counter: 9 })
expect(reducer(undefined, decrement(new Error()))).toEqual({ counter: 0 })
expect(reducer(undefined, increment(new Error()))).toEqual({ counter: 0 })
console.log(reducer(undefined, increment(new Error())))