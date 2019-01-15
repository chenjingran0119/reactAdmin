import React, {Component} from 'react'
import {
    Form, Icon, Input, Button,
} from 'antd';

import logo from '../../assets/images/logo.png'
import './index.less'
import {reqLogin} from '../../api'
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
        this.props.form.validateFields(async(error,values)=>{
            if(!error){
                console.log(values)
                const result = await reqLogin(values)
            }else{
                // this.props.form.resetFields()
            }
        })
        // const username = this.props.form.getFieldValue('username')
        // alert(username)
    }
    checkPassword=(rule,value,callback)=>{
        if(!value){
            callback("请输入密码")
        }else if(value.length<4||value.length>8){
            callback("密码必须是4-8位")
        }else{
            callback()
        }
    }
    render(){
        const {getFieldDecorator}=this.props.form
        return(
            <Form className="login-form">
                <Item>
                    {getFieldDecorator('username',{
                        initialValue:'admin',
                        rules: [
                            {type:"string", required: true, message: 'Username is required!' },
                            { min:4, message: '必须长于4为' }
                        ]
                    })(
                        <Input prefix={<Icon type="user"  />} placeholder="Username" />
                    )}

                </Item>
                <Item>

                    {getFieldDecorator('password',{
                    rules: [
                        {validator:this.checkPassword}
                    ]

                })(
                    <Input type="password" prefix={<Icon type="lock" />} placeholder="password" />
                    )}

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