import React from  'react'
import {HashRouter,Route,Switch} from 'react-router-dom'
import App from './App'
import Login from './pages/login/login'
import Admin from './admin'

import Home from './pages/home/home'
import Buttons from './pages/ui/buttons'
import Modals from './pages/ui/modals'
import Loading from './pages/ui/loadings'
import Noti from './pages/ui/notification'
import Messages from './pages/ui/messages'
import Tabs from './pages/ui/tabs'
import Gallery from './pages/ui/gallery'
import Carousel from './pages/ui/carousel'
import LoginPage from './pages/form/login'
import Register from './pages/form/register'
import Basic from './pages/table/basic'
import High from './pages/table/high'
import City from './pages/city/city'
import Order from './pages/order/order'
import User from './pages/user/user'
import Common from './component/Common/common'
import OrderDetail from './pages/order/orderDetail'
import Permission from './pages/permission/permission'
import NotFound from './pages/notFound/notFound'
export default class AppRouter extends React.Component{
    render(){
        return (
            <HashRouter>
                <App>
                    <Switch>
                        <Route path="/login" component={Login}></Route>
                        <Route path="/common" render={()=>
                            <Common>
                                <Route path="/common/order/detail/:orderId" component={OrderDetail}></Route>
                            </Common>
                        }>
                        </Route>
                        <Route path="/" render={()=>//箭头函数相当于直接return 等同于 => {}
                            <Admin>
                                <Switch>
                                    <Route path="/home" component={Home}></Route>
                                    <Route path="/ui/buttons" component={Buttons}></Route>
                                    <Route path="/ui/modals" component={Modals}></Route>
                                    <Route path="/ui/loadings" component={Loading}></Route>
                                    <Route path="/ui/notification" component={Noti}></Route>
                                    <Route path="/ui/messages" component={Messages}></Route>
                                    <Route path="/ui/tabs" component={Tabs}></Route>
                                    <Route path="/ui/gallery" component={Gallery}></Route>
                                    <Route path="/ui/carousel" component={Carousel}></Route>
                                    <Route path="/form/login" component={LoginPage}></Route>
                                    <Route path="/form/register" component={Register}></Route>
                                    <Route path="/table/basic" component={Basic}></Route>
                                    <Route path="/table/high" component={High}></Route>
                                    <Route path="/city" component={City}></Route>
                                    <Route path="/order" component={Order}></Route>
                                    <Route path="/user" component={User}></Route>
                                    <Route path="/permission" component={Permission}></Route>

                                    <Route component={NotFound}></Route>
                                </Switch>
                            </Admin>
                        }>
                        </Route>
                    </Switch>
                </App>
            </HashRouter>
        )
    }
}