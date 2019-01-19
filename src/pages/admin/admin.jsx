import React, {Component} from 'react'
import {Redirect,Route,Switch} from 'react-router-dom'
import {Row,Col} from 'antd'

import MemoryUtils from '../../utils/MemoryUtils'
import storangeUtils from '../../utils/storageUtils'
import LeftNav from '../../components/left-nav/left-nav'
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
import Role from '../role/role'
import User from '../user/user'

import './admin.less'
/*
后台管理主界面的路由组件
*/
export default  class Admin extends Component {


    render() {
        //检查用户是否已经登录，如果没有登录，自动跳转到登录界面
        const user = MemoryUtils.user
        // const user=storangeUtils.getUser()
        // console.log(user)
        if(!user||!user._id){
        //     //用在事件回调函数中
        //     // this.props.history.replace('./login')
        //     //渲染，重定向
            return <Redirect to="./login"/>
        }
        return (
            <Row className="container">
                <Col span = {4}>
                    <LeftNav></LeftNav>
                </Col>
                <Col span = {20} className="main">
                    <Header/>
                    <div className="content">
                        <Switch>
                            <Route path='/home' component={Home}/>
                            <Route path='/category' component={Category}/>
                            <Route path='/product' component={Product}/>
                            <Route path='/role' component={Role}/>
                            <Route path='/user' component={User}/>
                            <Route path='/charts/bar' component={Bar}/>
                            <Route path='/charts/line' component={Line}/>
                            <Route path='/charts/pie' component={Pie}/>
                            {/*一开页面让他显示home界面*/}
                            <Redirect to="/home"/>
                        </Switch>
                    </div>
                    <Footer/>
                </Col>
            </Row>
        )
    }
}