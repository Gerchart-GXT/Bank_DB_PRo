import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import Number from './content/number';
import String from './content/string';
const f1 = (state = 0, action) =>{
  switch(action.type){
    case "add": 
      return state + 1;
    case "sub":
      return state - 1;
    default:
      return state;
  }
};

const f2 = (state = ":", action) => {
  switch(action.type) {
    case "concat": 
      return state + action.character;
    default:
      return state
  }
};

const f3 = combineReducers({
  number: f1, 
  string: f2
});
const store = configureStore({
  reducer: f3
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Number></Number>
      <hr></hr>
      <String></String>
    </Provider>
  </React.StrictMode>
);