// 认证的页面
import React,{Component} from 'react';
// import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Logo from '../../component/logo/logo';
import {List , InputItem,WingBlank,WhiteSpace,Button,Toast} from 'antd-mobile';
import {login} from '../../redux/user.redux';
import {Redirect} from "react-router-dom";
import reactfrom from '../../component/reactForm/reactForm';
//合并reducer


class Hello extends Component{
    render(){
        return(<div>
            <p>react 进阶高级组件</p>

        </div>)
    }
}
//
// function WrapperHello(Comp){
//     class WrapComp extends Component{
//         componentDidMount(){
//             console.log('高阶组件新的生病周期，渲染完成')
//         }
//         render(){
//             return(<div>
//                 <p>这是HOC高阶组件特有的元素</p>
//                 <Comp {...this.props}></Comp>
//             </div>)
//         }
//     }
//     return WrapComp;
// }
//  Hello = WrapperHello(Hello);

// @reactfrom
class Login extends Component{
    constructor(props){
        super();
        this.state = {
           pwd:'',
           user:''
        };
        this.register = this.register.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }
    register(){
        this.props.history.push('/register');
    }
    componentDidMount(){

    }
    handleLogin(){
        this.props.login(this.state);
    }
    handleChange(key,value){
        this.setState({
            [key]:value
        });
    }

    render(){

        console.log(this.props)
        return(
            <div>
                {/*<Hello/>*/}
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> :''}

                <Logo/>

                {this.props.msg ? <p className="err-msg" >{this.props.msg }</p> : null}

                <List renderHeader={() => 'Confirm when typing'}>
                    <InputItem
                        type="text"
                        placeholder="请输入您的用户名"
                        onChange={v=>this.handleChange('user',v)}
                    >用户</InputItem>

                    <InputItem
                        type="password"
                        placeholder="请输入密码"
                        onChange={v=>this.handleChange('pwd',v)}

                    >密码</InputItem>
                </List>
                <WhiteSpace/>
                <WingBlank>
                    <Button type='primary' onClick={this.handleLogin}> 登录</Button>
                    <WhiteSpace/>
                    <Button type='primary' onClick={this.register}>注册</Button>
                    {/*使用bind绑定this，有助于性能优化*/}
                </WingBlank>

            </div>
        )
    }
}

// Login = connect(mapStatetoProps,actionCreators)(Login);
// reactfrom(state=>state)(Login)

export default connect(state => state.user,{login})(Login);


// connect可以用装饰器的方法来写
