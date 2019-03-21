import React ,{Component} from 'react';
import {List,Badge} from 'antd-mobile';
import {connect} from 'react-redux';


class Msg extends Component{
    constructor(props) {
        super(props);

    }
    componentWillMount(){

    }
    getLast(arr){
        return arr[arr.length-1];
    }
    handleClick(tartgetId){
        console.log(tartgetId)
        this.props.history.push(`/chat/${tartgetId}`)
    }

    render(){
        console.log(this.props)
        const Item = List.Item;
        const Brief = Item.Brief;
        const userid =this.props.user._id;

        const msgGroup = {};
        this.props.chat.chatmsg.forEach(v=>{
            msgGroup[v.chatid] = msgGroup[v.chatid] || [];
            msgGroup[v.chatid].push(v)
        });
        const chatList = Object.values(msgGroup).sort((a,b) =>{
            const a_last = this.getLast(a).create_time;
            const b_last = this.getLast(b).create_time;
            return b_last - a_last;

        });

        const avatar1 = require(`../../img/boy.png`);
        const avatar2 = require(`../../img/girl.png`);


        console.log(chatList)
        return(<div>
            <List renderHeader={() => 'Basic Style'} className="my-list" >
                {
                    chatList.map((v,i)=> {
                        const lastItem = this.getLast(v);
                        const tartgetId = v[0].from == userid ? v[0].to : v[0].from;
                        const unreadNum = v.filter(v=> !v.read && v.to === userid).length;
                        console.log(tartgetId)
                        return( <Item
                            // extra={v[0].content}
                            key={i}
                            thumb={avatar1}
                            onClick={ () =>this.handleClick(tartgetId)}
                            extra={<Badge text={unreadNum}></Badge>}
                        >
                            {lastItem.content}
                            <Brief>{this.props.chat.users[tartgetId] != undefined ?this.props.chat.users[tartgetId].name:''}</Brief>
                        </Item>)

                    })
                }
            </List>
        </div>)
    }
}
export default connect(state=>state)(Msg) ;
