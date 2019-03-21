
import React ,{Component} from 'react';

export default  function reactfrom(Comp){
    return class WrapComp extends Component{
        constructor(props){
            super(props)
            this.state={};
            this.handleChange= this.handleChange.bind(this);
        }
        componentDidMount(){
            console.log('高阶组件新的生病周期，渲染完成')
        }
        handleChange(key,value){
            this.setState({
                [key]:value
            });
        }
        render(){
            return(<div>
                <p>这是HOC高阶组件特有的元素</p>
                <Comp handleChange={this.handleChange()} state={this.state} {...this.props}></Comp>
            </div>)
        }
    }

}
