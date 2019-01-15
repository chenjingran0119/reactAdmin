/*
用来发送ajax请求的函数模块
内部封装axios
函数的返回值为promise对象
*/
//将axios引入
import axios from 'axios'
import {message} from 'antd'
//用一个参数，传递多个数据，用对象的形式，可以给一个默认值
//一般  修改才用post，查询用get
export default function ajax(url,data={},method='GET') {
    return new Promise((resolve,reject)=>{
        let promise
        if(method==='GET'){
            promise = axios.get(url,{params:data})
        }else if(method==='POST'){
            promise = axios.post(url,data)
        }
        promise.then(response=>{
            resolve(response.data)
        }).catch(error=>{
            message.error('请求出错')
        })
    })

}
async function reqLogin() {
    const result = await ajax('/login',{username:'tom',password:'123'},'POST')

    if(result.status===0){
        alert('成功')
    }else{
        alert('失败')
    }
}