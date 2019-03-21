import React ,{Component} from 'react';
import { List, InputItem, Icon,Toast ,NavBar,Grid} from 'antd-mobile';
import {connect} from 'react-redux';
import {getMsgList,sendMsg,recvMsg,readMsg} from '../../redux/chat.redux';
import axios from 'axios';
import {getChatId} from '../../util' ;


// import { createForm } from 'rc-form';


class Chat extends Component{
    constructor(props){
        super(props);
        this.state = {
            text:'' ,// 发送的消息内容
            msg:[],
            from:'',
            showEmoji:false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        if (!this.props.chatmsg.length) {
            this.props.getMsgList()
            this.props.recvMsg()
        }
        //监听日志

        //获取用户信息
        axios.get('/user/info')
            .then(res=>{
                if(res.status == 200){
                    if(res.data.code == 0){
                        this.setState({
                            from:res.data.data._id
                        })
                    }
                }
            })


    }
    componentWillUnmount(){
        //在组件卸载的时候进行计算未读消息量
        const to = this.props.match.params.user;
        //在进入页面的时候将未读消息改为已读
        this.props.readMsg(to);
        this.props.getMsgList();
    }


    fixCarousel(){
        setTimeout(function(){
            window.dispatchEvent(new Event('resize'))
        },0)
    }
    handleSubmit(){
        const from = this.state.from;//this.props.user._id;
        const to = this.props.match.params.user;
        const msg = this.state.text;
        if(msg == ''){
            Toast.info('发送消息不能为空', 2);
            return;
        }

        this.props.sendMsg({from,to,msg})
        this.setState({
            text:'',
            showEmoji:false
        })
        // this.props.recvMsg(); //读取数据
        // socket.emit('sendmsg',{text:this.state.text})
    }
    render(){

        const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
            .split(' ')
            .filter(v=>v)
            .map(v=>({text:v}));

        const Item = List.Item;

        const user = this.props.match.params.user;
        const users = this.props.users;
        const userName = users[user] != undefined ?users[user].name : '' ;

        const chatid = getChatId(user,this.state.from);
        const chatmsgs = this.props.chatmsg.filter(v => v.chatid == chatid);

        return(<div id='chat-page'>

            <NavBar
                mode='dark'
                icon={<Icon type="left" />}
                onLeftClick={()=>{
                    this.props.history.goBack()
                }}
            >{userName}</NavBar>
            <div className='pb100'>

                {chatmsgs.map((v,i)=>{
                    const avatar1 = require(`../../img/boy.png`);
                    const avatar2 = require(`../../img/girl.png`);

                    return v.from == user ? (<List renderHeader={() => ''}  key={i}>
                        <Item
                              thumb={avatar1}
                        >{v.content}</Item>

                    </List>
                    ) : (
                        <List renderHeader={() => ''}    key={i}>
                        <Item className='chat-me'
                              extra={<img alt='头像' src={avatar2} />}
                        >{v.content}</Item>

                    </List>
                    )
                })}
            </div>
            <div className='an-tab-bar zindex9'>
                <List >
                    <InputItem value={this.state.text} onChange={v=>{
                        this.setState({
                            text:v
                        })
                    }}
                               extra={
                                    <div>
                                        <span
                                            style={{ paddingTop:1,float:'left'}}
                                            onClick={()=>{
                                            this.setState({
                                                showEmoji:!this.state.showEmoji
                                            })}
                                        }>😀 </span>
                                        <span  style={{color:'blue'}} onClick={()=>this.handleSubmit() }>发送</span>
                                    </div>
                                  }
                    />
                </List>
                {
                    this.state.showEmoji? <Grid
                        data={emoji}
                        columnNum={9}
                        carouselMaxRow={4}
                        isCarousel={true}
                        onClick={el=>{
                            this.setState({
                                showEmoji:!this.state.showEmoji,
                                text:this.state.text+el.text
                            })
                            this.fixCarousel()
                        }}
                    />:null

                }

            </div>



        </div>)
    }
}
export default connect(state=>state.chat,{getMsgList,sendMsg,recvMsg,readMsg})(Chat);
