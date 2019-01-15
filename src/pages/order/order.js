import React from 'react'
import { Select ,Form , Button, Table,Modal,message,Card}  from 'antd';
import axios from '../../axios/https'
import Utils from '../../utils/utils'
import BaseForm from '../../component/BaseForm/baseForm'
const Option = Select.Option;

export default class Order extends React.Component{
    state = {
        tableData: [],
        orderConfirm: false
    }
    componentDidMount(){
        this.getOrderList({page:1});
    }
    //获取表格数据
    getOrderList = (data) => {
        axios.post('/order/list',data).then((res) => {
            this.setState({
                tableData: res.result.list,
                pagination: Utils.pagination(res,(current)=>{
                    this.getOrderList({page:current});
                })
            })
        })
    }
    //点击表格某一行
    onRowClick = (record,index) => {
        this.setState({
            selectedItem: record,
            selectedRowKeys: [index]
        })
    }
    //打开订单详情
    openOrderDetail = () => {
        let item = this.state.selectedItem;
        if(!(item)){
            Modal.info({
                title:'提示',
                content: '请选择一个订单'
            })
            return;
        }
        window.open(`/#/common/order/detail/${item.id}`,'_blank')
    }
    //结束订单的提示
    openOrderModal = () => {
        let item = this.state.selectedItem;
        if(!item){
            Modal.info({
                title:'提示',
                content: '请选择一个订单',
            })
            return;
        }
        if(item.orderStatus == 0){
            this.setState({
                orderConfirm: true
            })
        }else{
            Modal.info({
                title:'提示',
                content: '此订单已结束',
            })
        }
        
    }
    //确认结束订单
    closeOrder = () => {
        let item = this.state.selectedItem;
        axios.post('/order/end',{orderId:item.id}).then((res) => {
            if(res.code == 0){
                message.success('订单结束成功');
                this.setState({orderConfirm:false})
            }
        })
    }
    //列表筛选
    filtertable = () => {
        let info = this.filterForm.props.form.getFieldsValue();
        this.getOrderList(info);
    }
    //筛选
    handleFilter =(params) => {
        this.getOrderList(params);
    }
    //筛选表格元素
    filterList = [{
        type: 'SELECT',
        label: '城市',
        field: 'city',
        placeholder: '全部',
        initialValue: '1',
        width: 80,
        list: [{ id: '0', name: '全部' }, { id: '1', name: '北京' }, { id: '2', name: '天津' }, { id: '3', name: '上海' }]
    },
    {
        type: '时间查询'
    },
    {
        type: 'SELECT',
        label: '订单状态',
        field: 'order_status',
        placeholder: '全部',
        initialValue: '1',
        width: 80,
        list: [{ id: '0', name: '全部' }, { id: '1', name: '进行中' }, { id: '2', name: '结束行程' }]
    }]
    render () {
        let columns = [
            {
                  title: '订单编号',
                  dataIndex: 'orderNo',
                  key: 'orderNo',
              },{
                  title: '车辆编号',
                  dataIndex: 'carNo',
                  key: 'carNo',
              },{
                  title: '用户名',
                  dataIndex: 'userName',
                  key: 'userName',
                  width: '80px'
              },{
                  title: '手机号码',
                  dataIndex: 'mobileNo',
                  key: 'mobileNo',
              },{
                  title: '里程',
                  dataIndex: 'distanceKilometer',
                  key: 'distanceKilometer',
                  width: '80px'
              },{
                  title: '行程时长',
                  dataIndex: 'distanceTime',
                  key: 'distanceTime',
              },{
                  title: '状态',
                  dataIndex: 'orderStatus',
                  key: 'orderStatus',
                  render(orderStatus){
                      return orderStatus == 0 ? '进行中' : '行程结束'
                  }
              },{
                  title: '开始时间',
                  dataIndex: 'startTime',
                  key: 'startTime',
              },{
                  title: '结束时间',
                  dataIndex: 'endTime',
                  key: 'endTime',
              },{
                  title: '订单金额',
                  dataIndex: 'orderAmount',
                  key: 'workMorderAmountan',
              },{
                  title: '实付金额',
                  dataIndex: 'realPay',
                  key: 'realPay',
              }
          ]
          let data = this.state.tableData;
          data.map((item,index) => {
              item.key = index
          })
          let selectedRowKeys = this.state.selectedRowKeys
          let rowSelection = {
              type: 'radio',
              selectedRowKeys
          }
          let formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 18}
          }
          let info = this.state.selectedItem || {};
        return (
            <div>
                <Card>
                    <BaseForm filterList = {this.filterList} submitFilter = {this.handleFilter} />
                </Card>
                <Card>
                    <Button className="mb20 mr10" type="primary" onClick = {this.openOrderDetail}>订单详情</Button>
                    <Button className="mb20" type="primary" onClick = {this.openOrderModal}>结束订单</Button>
                    <Table bordered
                        columns = {columns}
                        dataSource = {data}
                        pagination = {this.state.pagination}
                        rowSelection = {rowSelection}
                        onRow = {(record,index) => {
                            return {
                                onClick : () => {
                                    this.onRowClick(record,index);
                                }
                            }
                        }}
                    />
                    <Modal title="结束订单"
                        visible={this.state.orderConfirm}
                        onCancel={() => {this.setState({orderConfirm: false})}}
                        onOk = {this.closeOrder}
                        width={600}
                    >
                        <Form layout="horizontal">
                            <Form.Item label="车辆编号：" {...formItemLayout}>
                                {info.carNo}
                            </Form.Item>
                            <Form.Item label="行程开始时间：" {...formItemLayout}>
                                {info.startTime}
                            </Form.Item>
                            <Form.Item label="电量" {...formItemLayout}>
                                100%
                            </Form.Item>
                            <Form.Item label="时间" {...formItemLayout}>
                                {info.distanceTime}
                            </Form.Item>
                        </Form>
                    </Modal>
                </Card>
            </div>
        )
    }
}


