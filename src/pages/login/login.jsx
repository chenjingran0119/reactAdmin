import React, {Component} from 'react'
import {
    Form, Icon, Input, Button, Checkbox,
} from 'antd';

import logo from '../../assets/images/logo.png'
import './index.less'
const Item = Form.Item
/*
登录的路由组件
*/
export default  class Login extends Component {
    render() {
        return (
            <div className="login">
                <div className="login-header">
                    <img src={logo} alt="尚硅谷后台管理系统"/>
                    React项目：后台管理系统
                </div>
                <div className="login-content">
                    <div className="login-box">
                        <div className="title">用户登录</div>
                        <LoginForm/>
                    </div>
                </div>
            </div>
        )
    }
}
//包含<Form>被包装组件
class LoginForm extends  React.Component{
    clickLogin =()=>{
        const username = this.props.form.getFieldValue('username')
        alert(username)
    }
    render(){
        const {getFieldDecorator}=this.props.form
        return(
            <Form className="login-form">
                <Item>
                    {/*前面的（）写标识，后面的{}写规则，后面的（）写标签*/}
                    {getFieldDecorator('username',{
                        rules: [{ required: true, message: 'Username is required!' }]
                    })(
                        <Input prefix={<Icon type="user"  />} placeholder="Username" />
                    )}

                </Item>
                <Item>
                    <Input type="password" prefix={<Icon type="lock" />} placeholder="password" />
                </Item>
                <Item>
                    <Button type="primary"  className="login-form-button" onClick={this.clickLogin}>登录</Button>
                </Item>

            </Form>

        )
    }
}
//包装包含<Form>的组件，生成一个新的组件（包装组件）
//包装组件会向被包装组件传递一个属性：from
LoginForm = Form.create()(LoginForm)