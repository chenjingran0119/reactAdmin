/*
包含n个接口请求函数的模块
对ajax模块进一步封装
函数返回的是promise对象
*/
import ajax from './ajax'
//参数传一个对象，可以不注意顺序，里面可以传多个值,三个以上最好用对象
//登录
export const reqLogin = (username,password) =>ajax('/login',{username,password},'POST')
//添加用户
export const reqAddUser = (user)=>ajax('/manage/user/add',user,'POST')
