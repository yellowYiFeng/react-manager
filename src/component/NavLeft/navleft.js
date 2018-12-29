import React from 'react'
import './navleft.less'
import munuList from '../../config/menuconfig'//菜单
import {Menu} from 'antd'
import { HashRouter as Router, Route,NavLink, Link,Switch } from "react-router-dom";
const SubMenu = Menu.SubMenu
export default class NavLeft extends React.Component{
    componentWillMount(){    
        const menuTreeNode = this.renderMenu(munuList);
        this.setState({
            menuTreeNode
        })
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

    render(){
        return <div>
                    <div className="logo" to="/home">
                        <img alt="" src="/assets/logo-ant.svg" />
                    </div>
                    <Menu style={{ width: 220,height:'calc(100vh)'}} mode="vertical" theme="dark">
                        {this.state.menuTreeNode}
                    </Menu>
                </div>
    }
}