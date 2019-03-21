import axios from 'axios';
import io from 'socket.io-client';
const socket =   io('ws://localhost:9000');

//获取聊天列表
const MSG_LIST = 'MSG_LIST';
//读取信息
const MSG_RECV = 'MSG_REVV';
//标识已读

const MSG_READ = 'MSG_READ';

const initState= {
   chatmsg:[],
   unread:0,
   users:[]
};

export function chat(state=initState,action){
    switch(action.type){
        case MSG_LIST:
            return {...state,users:action.payload.users, chatmsg:action.payload.msgs,unread:action.payload.msgs.filter(v=>!v.read && v.to==action.payload.userid).length }
        case MSG_RECV:
            const unread = action.payload.data.to == action.payload.userid ? state.unread+1:state.unread;
            return {...state,chatmsg:[...state.chatmsg,action.payload.data],unread:unread};
        case MSG_READ:
            const {from,num} = action.payload;
        return {...state,chatmsg:state.chatmsg.map(v=>({...v,read: from==v.from ? true : v.read})),unread:unread-num};
        default:
        return state
    }
}
function msgList(users,msgs,userid){
    return {type:MSG_LIST,payload:{users,msgs,userid}}

}

//监听信息列表
function msgRecv({data,userid}){
    return {type:MSG_RECV,payload:{data,userid}}
}

function msgRead({from,userid,num}){
    return {type:MSG_READ,payload:{from,userid,num}}
}
export function readMsg(from ){
    console.log(from,'已读请求')
    return (dispatch,getState) => {
        axios.post('/user/readmsg',{from})
            .then(res=>{
                const userid = getState().user._id;
                if(res.state == 200 && res.data.code ==0){
                    dispatch(msgRead({userid,from,num:res.data.num}));
                }
            })
    }
}
//读取信息列表
export function recvMsg() {
    return (dispatch,getState)=>{
        socket.on('recvmsg',function(data){
            const userid = getState().user._id;
            dispatch(msgRecv({data,userid}))
        })
    }
}
//获取信息列表
export function getMsgList() {
    return (dispatch ,getState)=> {  //getState 可以获取所有的状态
        axios.get('/user/getmsglist')
            .then(res=>{
                if(res.status == 200 && res.data.code == 0){
                    const userid = getState().user._id;
                    dispatch(msgList(res.data.users,res.data.msgs,userid));
                }
            })
    }
}
//获取信息列表
export function sendMsg({from,to,msg}) {
    return dispatch => {
        socket.emit('sendmsg',{from,to,msg})
    }
}
