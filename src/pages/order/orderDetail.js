import React from 'react'
import {Card,Button} from 'antd'
import axios from '../../axios/https'
import './order.less'

export default class OrderDetail extends React.Component{

    state = {}
    componentDidMount(){
        let orderId = this.props.match.params.orderId;
        this.getOrderDetail(orderId);
    }
    getOrderDetail = (orderId) => {
        axios.post('/order/detail',{orderId:orderId}).then((res) => {
            if(res.code == 0){
                this.setState({
                    orderDetailInfo: res.result.list[orderId]
                })
            }
        })
    }
    render(){
        let info = this.state.orderDetailInfo || {}
        return (
            <div>
                <Card>
                    <Button type="primary">原始轨迹</Button>
                    <div className="detailMap"></div>
                </Card>
                <article className="item">
                    <section className="item-top">
                        <h2 className="item-title">基础信息</h2>
                        <ul className="item-form">
                            <li>
                                <div className="item-form-left">用车模式:</div>
                                <div className="item-form-right">{info.bikeMode == 0 ? '停车点' : '禁停点'}</div>
                            </li>
                            <li>
                                <div className="item-form-left">订单编号:</div>
                                <div className="item-form-right">{info.orderNo}</div>
                            </li>
                            <li>
                                <div className="item-form-left">车辆编号:</div>
                                <div className="item-form-right">{info.carNo}</div>
                            </li>
                            <li>
                                <div className="item-form-left">用户姓名:</div>
                                <div className="item-form-right">{info.userName}</div>
                            </li>
                            <li>
                                <div className="item-form-left">手机号码:</div>
                                <div className="item-form-right">{info.mobile}</div>
                            </li>
                        </ul>
                    </section>
                    <section className="item-bottom">
                    <h2 className="item-title">行程轨迹</h2>
                        <ul className="item-form">
                            <li>
                                <div className="item-form-left">行程起点:</div>
                                <div className="item-form-right">{info.startPoint}</div>
                            </li>
                            <li>
                                <div className="item-form-left">行程终点:</div>
                                <div className="item-form-right">{info.endPoint}</div>
                            </li>
                            <li>
                                <div className="item-form-left">行程里程:</div>
                                <div className="item-form-right">{info.totalKilometer}</div>
                            </li>
                        </ul>
                    </section>



                </article>
            </div>
        )
    }
}