// 认证的页面
import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import Logo from '../../component/logo/logo';
import {List , InputItem,WingBlank,WhiteSpace,Button,Radio} from 'antd-mobile';
import {connect} from 'react-redux';
import {register} from '../../redux/user.redux';

const data = [
    { type: 0, label: 'Boss' },
    { type: 1, label: 'genius' },
];
const RadioItem = Radio.RadioItem;

class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            type:"genius",
            user:'',
            pwd:'',
            repeatPwd:'',

        }
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }
    componentDidMount(){

    }
    handleChange(key,val){

        this.setState({
            [key]:val
        })

    }
    login(){
        this.props.history.push('/login')
    }

    //点击注册
    handleRegister(){
        console.log(this.state);
        this.props.register(this.state);
    }
    render(){

        const { value} = this.state;

        return(
            <div>
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
                    <InputItem
                        type="password"
                        placeholder="请输入密码"
                        onChange={v=>this.handleChange('repeatPwd',v)}
                    >确认密码</InputItem>

                    {data.map(i => (
                        <RadioItem key={i.type} checked={ this.state.type === i.label} onChange={() => this.handleChange('type',i.label)}>
                            {i.label}
                        </RadioItem>
                    ))}
                </List>
                <WhiteSpace/>
                <WingBlank>
                    <Button type='primary' onClick={this.login}> 登录</Button>
                    <WhiteSpace/>
                    <Button type='primary' onClick={this.handleRegister}>注册</Button>
                    {/*使用bind绑定this，有助于性能优化*/}
                </WingBlank>
            </div>
        )
    }
}

export default connect(state=>state.user,{register})(Register) ;
