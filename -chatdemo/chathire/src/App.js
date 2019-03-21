import React,{Component} from 'react';
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


import './config';
import AuthRoute from "./component/authRoute/authRoute";
import Dashboard from './component/dashboard/dashboard';
import Chat from './container/chat/chat';

const reduxDevToos = window.devToolsExtension ? window.devToolsExtension() : {} ;

const store = createStore(reducers,compose(
    applyMiddleware(thunk),
    reduxDevToos

));//可以处理异步的请求

class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    <AuthRoute/>
                    <Route path='/' exact component={Login}/>
                    <Switch>

                        {/*<Route path='/' exact component={App}/>*/}
                        {/*<Route path='/bossinfo'  component={BossInfo}/>*/}
                        {/*<Route path='/geniusinfo' component={GeniusInfo}/>*/}
                        <Route path='/login' component={Login}/>
                        <Route path='/register' component={Register}/>
                        <Route path='/chat/:user' component={Chat}/>
                        {/*404页面 和公共页面*/}
                        <Route component={Dashboard}/>
                    </Switch>

                </div>
            </BrowserRouter>
        </Provider>
    );
  }
}

export default App;
