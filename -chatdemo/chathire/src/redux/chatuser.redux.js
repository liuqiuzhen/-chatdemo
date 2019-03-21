
import axios from 'axios';

const USER_LIST = 'USER_LIST';

const initState = {
    userList:[]
}

export function chatuser(state=initState,action){
    console.log()
    switch (action.type) {
        case USER_LIST:
            return {...state,userList:action.payload}
        default:
            return state
    }
}

function userlist(data){
    return {type:'USER_LIST',payload:data}
}

export function getUserList(type){
    return dispatch=>{


        axios.get(`/user/list?type=${type}`)
        .then(res=>{
            if(res.status==200){
                dispatch(userlist(res.data));
            }
        })
    }
}
