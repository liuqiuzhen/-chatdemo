import React, { Component } from 'react';
import axios from 'axios';
import {Redirect, withRouter,Switch,Route} from 'react-router-dom';
import {loadData} from '../../redux/user.redux';

import {connect} from 'react-redux';

import { NavBar } from 'antd-mobile';

import NavLinkBar from '../navLinkBar/navLinkBar';
import '../../index.css';
import Boss from '../../container/boss/boss';
import Genius from '../../container/genius/genius';
import User from '../../container/user/user';
import Msg from '../../container/msg/msg'

import {getMsgList,sendMsg,recvMsg} from '../../redux/chat.redux';


class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'redTab',
            hidden: false,
            fullScreen: false,
        };
    }
    componentDidMount(){
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList();
            this.props.recvMsg();
        }
    }

    render() {
        const user = this.props.user;
        const pathname = this.props.location.pathname;
        const navList = [
            {
                path:'/boss',
                text:'牛人',
                icon:'chick',
                title:'牛人列表',
                component:Boss,
                hide:user.type == 'genius'
            },
            {
                path:'/genius',
                text:'boss',
                icon:'chick',
                title:'公司',
                component:Genius,
                hide:user.type == 'Boss'
            },
            {
                path:'/message',
                text:'消息列表',
                icon:'chick',
                title:'消息',
                component:Msg,
            },
            {
                path:'/user',
                text:'我的',
                icon:'chick',
                title:'个人中心',
                component:User,
            }
        ]

        return(<div>
            <NavBar mode='dark' className='fixed-header'>
                {
                    pathname=='/' ? '': navList.find(v=>(v.path === pathname) ).title
                }
            </NavBar>

            <div>
                <Switch>
                    {
                        navList.map(v=>(
                            <Route path={v.path}  key={v.path} component={v.component}/>
                        ))
                    }
                </Switch>

            </div>
            {/*<Route path='/boss' component={Boss}/>*/}
            {/*<Route path='/genius' component={Genius}/>*/}

            <NavLinkBar data={navList}/>
        </div>);
    }
}
export default connect((state)=>state,{loadData,getMsgList,sendMsg,recvMsg})(withRouter(Dashboard));
// export default AuthRoute;
