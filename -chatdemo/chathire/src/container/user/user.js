import React ,{Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import { Result, Button, WhiteSpace,List,Modal,Toast } from 'antd-mobile';
import {loadData,logout} from '../../redux/user.redux';
import browerCookies from "browser-cookies";


const myImg = src => <img src={src} className="spe am-icon am-icon-md" alt="" />;
const alert = Modal.alert;



class User extends Component{
    componentWillMount(){

    }
    render(){
        console.log(this.props,'=====获取的用户信息==')
        const Item = List.Item;
        const Brief = Item.Brief;
        return this.props.user ? (<div>
            {/*<Hello/>*/}
            <div className="result-example mt10">
                <Result
                    img={myImg(require('../../img/girl.png'))}
                    title={this.props.user}

                    message={<div>{this.props.type=='Boss'?this.props.company:''}</div>}
                />
                <WhiteSpace />
                <List renderHeader={() => '简介'} className="my-list">
                    <Item multipleLine={true}>
                        {this.props.title}
                        <Brief>{this.props.desc}</Brief>
                        {
                            this.props.money ? <Brief>{this.props.desc}</Brief> : null
                        }


                        {/*{*/}
                            {/*this.props.desc.split('\n').map(v=>(*/}
                            {/*<Brief key='v-key'>{v}</Brief>*/}
                        {/*))*/}
                        {/*}*/}

                    </Item>



                </List>
                <WhiteSpace />
                {/*<Item multipleLine={true} onClick={()=>this.logout()}>*/}
                    {/*退出登录*/}
                {/*</Item>*/}
                <Button
                    onClick={() =>
                        alert('', '确认退出登录?', [
                            { text: '取消', onPress: () => console.log('cancel') },
                            {
                                text: '确认',
                                onPress: () =>
                                {
                                    browerCookies.erase('userid');
                                    this.props.logout();
                                }
                            },
                        ])
                    }
                >
                    退出登录
                </Button>



            </div>
        </div>):<Redirect to='/login'></Redirect>
    }
}
export default connect(state=>state.user,{loadData,logout})(User);
