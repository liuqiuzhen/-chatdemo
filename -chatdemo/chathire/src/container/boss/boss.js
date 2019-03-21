import React ,{Component} from 'react';

// import axios from 'axios';
import {Card,WingBlank, WhiteSpace } from 'antd-mobile';
import {connect} from 'react-redux';
import {getUserList} from '../../redux/chatuser.redux';
import {withRouter} from 'react-router-dom';


class Boss extends Component{
    constructor(){
        super();
        this.state={
            data:[]
        }
    }

    componentWillMount(){
       this.props.getUserList('genius');
    }
    handleClick(v){
        this.props.history.push(`/chat/${v._id}`)
    }
    render(){
        const userList = this.props.userList;

        return(<div>
            <WingBlank size="lg" className='pb100'>
                <WhiteSpace size="lg" />
                {userList.map(v=>(
                    // v.avatar ?
                    <Card key={v._id} className='mt10'
                    onClick={()=>this.handleClick(v)}>
                        <Card.Header
                            title={v.user}
                            thumb={require(`../../img/bull.png`)}
                            extra={<span>{v.title}</span>}
                        />
                        <Card.Body
                            title={v.dec}
                        />
                    </Card>

                    // :null
                    )
                )}

                <WhiteSpace size="lg" />
            </WingBlank>
        </div>)
    }
}
export default  connect(state=>state.chatuser,{getUserList})(withRouter(Boss)) ;
