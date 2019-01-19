/*
封装一些用于local保存数据的工具函数(值不能是函数，或是undefined）
保存
读取
删除
*/

import store from 'store'

//保存
function setItem(name,value) {
    if(value&&typeof value!=='function'){
        //如果是对象或数组，会自动转成json数组
        store.set(name,value)
    }else{
        // alert('不支持此类型数据的存储')
        console.log(value)
    }

}

//读取
function getItem(name) {
    //如果没有值，后面可能会继续调用方法，为了避免报错，可以加一个‘’
    return store.get(name)||''
}

//删除
function removeItem(name) {
    store.remove(name)
}
export  default {
    saveUser(user){
        setItem('user_key',user)
    },
    getUser(){
        return getItem('user_key')
    },
    removeItem(){
        removeItem('user_key')
    }
}