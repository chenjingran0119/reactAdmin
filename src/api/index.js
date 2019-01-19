/*
包含n个接口请求函数的模块
对ajax模块进一步封装
函数返回的是promise对象
*/
import jsonp from 'jsonp'
import ajax from './ajax'
//参数传一个对象，可以不注意顺序，里面可以传多个值,三个以上最好用对象
//登录
export const reqLogin = (username,password) =>ajax('/login',{username,password},'POST')
//添加用户
export const reqAddUser = (user)=>ajax('/manage/user/add',user,'POST')
//获取一级/二级分类列表
export const reqCategorys = (parentId) => ajax('/manage/category/list',{parentId})
//添加分类
export const reqAddCategorys = (parentId,categoryName) => ajax('/manage/category/add',{parentId,categoryName},'POST')
//更新分类
export const reqUpdateCategorys = ({categoryId,categoryName}) => ajax('/manage/category/update',{categoryId,categoryName},'POST')
//请求获取天气
export  function  reqWeather(city) {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    // 发异步ajax请求
    return new Promise(function (resolve,reject) {
        //发送异步ajax请求
        jsonp(
            url,
            {
                param:'callback'
            },
            (error,data) => {
                console.log('callback',error,data)
                if(!error){
                    const {dayPictureUrl,weather}= data.results[0].weather_data[0]
                    resolve({dayPictureUrl,weather})
                }else{
                    alert('请求天气接口出错')
                }
            }
        )
        //如果成功了，调用resolve传递数据
        //如果出错，显示提示信息
    })
}
// reqWeather('北京').then(()=>{}).catch(()=>{})
