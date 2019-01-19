import React, {Component} from 'react'
import {Row,Col,Modal} from 'antd'
import {withRouter} from 'react-router-dom'

import MemoryUtils from '../../utils/MemoryUtils'
import storangeUtils from '../../utils/storageUtils'
import menuList from '../../config/menuConfig'
import {reqWeather} from '../../api/index'
import './header.less'
import {formateDate} from '../../utils/utils'
console.log('menu列表'+menuList)
/*
 头部组件
 */
class Header extends Component {
    state = {
        sysTime :formateDate(Date.now()),
        dayPictureUrl:'',
        weather:''
    }
    /*
    启动循环定时器，每隔1s更新一次sysTime
    */
    getSysTime=()=>{
        this.intervalId=setInterval(()=>{
            this.setState({
                sysTime :formateDate(Date.now())
            })
        },1000)
    }
    /*
    发送异步ajax请求，获取天气数据并更新状态
    */
    getWeather = async() => {
        const {dayPictureUrl,weather}=await reqWeather('北京')
        this.setState({
            dayPictureUrl,
            weather
        })
    }
    /*
    根据请求的path得到对应的标题
    */
    getTitle = (path) => {
        let title
        menuList.forEach(menu=>{
            if(menu.key===path){
                title=menu.title
            }else if(menu.children){
                menu.children.forEach(item => {
                    if(item.key === path){
                        title = item.title
                    }
                })
            }
        })
        return title
    }
    /*退出登录*/
    logout = () => {
        Modal.confirm({
            content: '确定退出么',
            onOk:() =>{
                console.log('OK')
                //移除保存的user
                storangeUtils.removeItem()
                MemoryUtils.user = {}
                //跳到login页面
                this.props.history.replace('/login')
            },
            onCancel() {
                console.log('Cancel')
            },
        });
    }

    componentDidMount(){
        this.getSysTime()
        this.getWeather()
    }
    componentWillUnmount(){
        clearInterval(this.intervalId)
    }
    render() {
        const {sysTime,dayPictureUrl,weather}=this.state
        const user = MemoryUtils.user
            //得到当前请求的路径
        const path = this.props.location.pathname
        const title = this.getTitle(path)
        return (
            <div className='header'>
                <Row className='header-top'>
                    <span>欢迎，{user.username}</span>
                    <a href="javascipt:" onClick={this.logout}>退出</a>
                </Row>
                <Row className='breadcrumb'>
                    <Col className='breadcrumb-title' span={4}>{title}</Col>
                    <Col className='weather' span={20}>
                        <span className="date">{sysTime}</span>
                        <span className="weather-img">
                            <img src={dayPictureUrl} alt="weather"/>
                        </span>
                        <span className="weather-detail">{weather}</span>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default withRouter(Header)