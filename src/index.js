/*
 入口JS
 */
import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import storangeUtils from './utils/storageUtils'
import MemoryUtils from './utils/MemoryUtils'
//读取local中的user，如果存在，保存在内存中
const user = storangeUtils.getUser()
if(user._id && user){
    MemoryUtils.user = user
}
ReactDOM.render(<App />, document.getElementById('root'))