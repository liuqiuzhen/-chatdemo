
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Route,Link,Redirect,Switch} from 'react-router-dom'
import './index.css';

import * as serviceWorker from './serviceWorker';
import {createStore,applyMiddleware,compose} from 'redux';
import 'antd-mobile/dist/antd-mobile.css'
import reducers from './reducer';

import thunk from 'redux-thunk';

import {Provider} from 'react-redux';
import Login from './container/login/login';
import Register from './container/register/register';


import App from './App'

import './config';
import AuthRoute from "./component/authRoute/authRoute";
import Dashboard from './component/dashboard/dashboard';
import Chat from './container/chat/chat';

const reduxDevToos = window.devToolsExtension ? window.devToolsExtension() : {} ;

const store = createStore(reducers,compose(
    applyMiddleware(thunk),
    reduxDevToos

));//可以处理异步的请求


// function Dashboard(){
//     return <h2>Dashboard</h2>
// }
// boss genius me msg (4个页面)

ReactDOM.render(

    (<App/>)
    , document.getElementById('root'));


serviceWorker.unregister();


