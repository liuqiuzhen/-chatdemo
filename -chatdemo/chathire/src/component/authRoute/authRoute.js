import React, { Component } from 'react';
import axios from 'axios';
import {Redirect, withRouter} from 'react-router-dom';
import {loadData} from '../../redux/user.redux';

import {connect} from 'react-redux';

// import from '';

class AuthRoute extends Component {
    componentDidMount(){
        const publicList = ['/login','/register'];
        const pathname = this.props.location.pathname;
        // console.log(publicList.indexOf(pathname),pathname)

        if(publicList.indexOf(pathname) > -1){
            return null;
        }

        //获取用户信息
        axios.get('/user/info')
            .then(res=>{
                if(res.status == 200){

                    if(res.data.code == 0){
                        this.props.loadData(res.data.data);
                    }else{
                        this.props.history.push('/login');
                    }
                }
            })

    //    是否登录
    //    现在的url地址  login是不需要跳转的

    //    用户的type 身份是boss还是牛人
    //    用户是否完善信息（选择投降，个人简历）
    }
    render() {
        return null;
    }
}
export default connect((state)=>state,{loadData})(withRouter(AuthRoute));
// export default AuthRoute;
