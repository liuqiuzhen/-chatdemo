// 认证的页面
import React,{Component} from 'react';
import logo from '../../img/boy.png';
import './logo.css';

//合并reducer

class Logo extends Component{
    constructor(props){
        super()
    }
    componentDidMount(){

    }

    render(){


        return(
            <div className='logo-container'>
                <img src={logo} alt=""/>
            </div>
        )
    }
}


export default Logo;


// connect可以用装饰器的方法来写
