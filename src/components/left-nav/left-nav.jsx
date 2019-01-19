import React, {Component} from 'react'
import {NavLink,withRouter} from 'react-router-dom'
import {Menu,  Icon} from 'antd'

import menuList from '../../config/menuConfig'
import './left-nav.less'
const SubMenu = Menu.SubMenu
const Item = Menu.Item
/*
 左侧导航组件
 */
class LeftNav extends Component {
    /*
     得到当前用户需要显示的所有menu元素的列表
     使用递归调用
     */
    getNodes=(list)=>{
        //遍历累加的回调函数
        return list.reduce((pre,item)=>{
            if(item.children){
                const subMenu=(
                    <SubMenu key={item.key} title={<span><Icon type={item.icon}/><span>{item.title}</span></span>}>
                        {
                            this.getNodes(item.children)
                        }
                    </SubMenu>
                )
                pre.push(subMenu)
                //计算得到当前请求路径对应的父菜单的key
                const path = this.props.location.pathname
                const cItem = item.children.find((child => path.indexOf(child.key)===0))
                if(cItem) {
                    this.openKey = item.key
                    //只有请求的路径找到对应的cItem才有selectKey
                    this.selectKey = cItem.key
                }

            }else{
                const menuItem=(
                    <Item key={item.key}>
                        <NavLink to={item.key}>
                            <Icon type={item.icon}/>{item.title}
                        </NavLink>
                    </Item>
                )
                pre.push(menuItem)
            }
            return pre
        },[])
    }
    // getMenuNodes = (menus) => {
    //     return menus.reduce((pre, item) => {
    //         if (item.children) {
    //             const subMenu = (
    //                 <SubMenu key={item.key}
    //                          title={<span><Icon type={item.icon}/><span>{item.title}</span></span>}>
    //                     {
    //                         this.getMenuNodes(item.children)
    //                     }
    //                 </SubMenu>
    //             )
    //             pre.push(subMenu)
    //         } else {
    //             const menuItem = (
    //                 <Menu.Item title={item.title} key={item.key}>
    //                     <NavLink to={item.key}>
    //                         <Icon type={item.icon}/>{item.title}
    //                     </NavLink>
    //                 </Menu.Item>
    //             )
    //             pre.push(menuItem)
    //         }
    //         return pre
    //     }, [])
    // }
    componentWillMount() {
        // this.menuNodes = this.getMenuNodes(menuList)
        this.menuNodes = this.getNodes(menuList)
    }
        render() {
        const path = this.selectKey||this.props.location.pathname
        console.log(path)
        return (
            <div className='left-nav'>
                <NavLink to="/home" className="logo">
                    <img src="/static/media/logo.ba1f87ec.png" alt="logo"/>
                    <h1>尚硅谷后台</h1>
                </NavLink>
                <Menu
                    mode="inline"
                    theme="dark"
                    //为了初始页面时，显示的页面能够出现绿色框，表示选中了
                    defaultSelectedKeys={[path]}
                    defaultOpenKeys={[this.openKey]}
                >
                    {this.menuNodes}
                </Menu>
            </div>
        )
    }
}
// 将一个非路由组件包装生成一个路由组件, 向非路由组件传递路由组件才有的3个属性: history/location/match
export default withRouter(LeftNav)