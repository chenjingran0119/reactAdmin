import React,{Component} from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'

import ProductIndex from './index'
import ProductSaveUpdate from './save-update'
import ProductDetail from './detail'

/*商品管理的路由*/
export default class Product extends Component{
    render(){
        return(
            <Switch>
                <Route path="/product/index" component={ProductIndex}/>
                <Route path="/product/save-update" component={ProductSaveUpdate}/>
                <Route path="/product/detail" component={ProductDetail}/>
                <Redirect to="/product/index"/>
            </Switch>
        )
    }
}