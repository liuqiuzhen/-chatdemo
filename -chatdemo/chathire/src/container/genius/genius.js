import React ,{Component} from 'react';
// import axios from 'axios';
import {Card,WingBlank, WhiteSpace } from 'antd-mobile';
import {connect} from 'react-redux';
import {getUserList} from '../../redux/chatuser.redux';


class Genius extends Component{
    constructor(){
        super();
        this.state={
            data:[]
        }
    }

    componentWillMount(){
        this.props.getUserList('Boss');
    }
    handleClick(v){
        this.props.history.push(`/chat/${v._id}`)
    }
    render(){
        console.log(this.props,'==vvvvvvv==');
        const userList = this.props.userList;

        return(<div>
            <WingBlank size="lg">
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

                            <Card.Body title={v.desc}>
                                <p>{v.desc}</p>
                            </Card.Body>
                            <Card.Footer content={`薪资：${v.money}`}/>
                        </Card>

                        // :null
                    )
                )}

                <WhiteSpace size="lg" />
            </WingBlank>
        </div>)
    }
}
export default  connect(state=>state.chatuser,{getUserList})(Genius) ;
