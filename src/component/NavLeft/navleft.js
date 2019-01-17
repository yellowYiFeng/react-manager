import React from 'react'
import './navleft.less'
import munuList from '../../config/menuconfig'//菜单
import {Menu} from 'antd'
import {NavLink} from "react-router-dom"
import { connect } from 'react-redux'
import { switchMenu, saveBtnList } from '../../redux/action/action'
const SubMenu = Menu.SubMenu
class NavLeft extends React.Component{
    state = {}
    componentWillMount(){    
        const menuTreeNode = this.renderMenu(munuList);
        this.setState({
            menuTreeNode
        });
    }
    
    //菜单渲染
    renderMenu =(data) =>{
        return data.map((item)=>{
            if(item.children){
                return (
                    <SubMenu title={item.title} key={item.key}>
                        { this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return <Menu.Item title={item.title} key={item.key}>
                        <NavLink to={item.key}>{item.title}</NavLink>
                    </Menu.Item>
        })
    }
    handleClick = ({ item, key }) => {
        if (key == this.state.currentKey) {
            return false;
        }
        // 事件派发，自动调用reducer，通过reducer保存到store对象中
        const { dispatch } = this.props;
        dispatch(switchMenu(item.props.title));

        this.setState({
            currentKey: key
        });
        // hashHistory.push(key);
    };

    render(){
        return <div>
                    <div className="logo" to="/home">
                        <img alt="" src="/assets/logo-ant.svg" />
                    </div>
                    <Menu style={{ width: 220,height:'calc(100vh)'}} mode="vertical" theme="dark" onClick={this.handleClick} >
                        {this.state.menuTreeNode}
                    </Menu>
                </div>
    }
}
export default connect()(NavLeft)