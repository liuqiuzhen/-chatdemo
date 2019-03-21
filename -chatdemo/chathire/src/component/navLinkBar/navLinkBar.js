import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {loadData} from '../../redux/user.redux';

import {connect} from 'react-redux';

import {Icon,TabBar } from 'antd-mobile';
import propTypes from 'prop-types';
import '../../index.css'



class NavLinkBar extends Component {

    static propTypes = {
        data:propTypes.array.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentDidMount(){

    }

    render() {
        const navList = this.props.data.filter(v=>!v.hide);
        const {pathname} =  this.props.location;
        return(
            <div className='an-tab-bar'>
                <TabBar >
                    {navList.map(v=> {

                            return <TabBar.Item
                                title={v.title}
                                key={v.text}
                                icon={{uri: require(`../../img/${v.icon}.png`)}}
                                selectedIcon={{uri: require(`../../img/boy.png`)}}
                                badge={v.path == '/message' ? this.props.unread :''}
                                selected={pathname === v.path }
                                onPress={()=>{
                                    this.props.history.push(v.path)
                                }}
                            />
                        }

                    )}


                </TabBar>
            </div>

        );
    }
}
export default connect((state)=>state.chat,{loadData})(withRouter(NavLinkBar));
// export default AuthRoute;
