import React from 'react'
import axios from '../../axios/https'
import Utils from '../../utils/utils'
import {Table, Modal, messag,Card } from 'antd'
export default class HighTable extends React.Component{
    state = {
        page: 1,//表格页数
        basicData: [],//表格数据
        selectedRowKeys: [],//选中行下标
        selectedRows: [],//选中行
    }
    componentDidMount () {
        this.getData();//获取表格数据
    }
    getData = () => {
        let _this = this;
        axios.get({
            url: '/table/list',
            data: {
                params: {
                    page: this.state.page//1//this.params.page
                }
            }
        }).then((res) => {
            this.setState({
                basicData: res.result.list,
                pagination: Utils.pagination(res,(current)=>{
                    _this.state.page = current;
                    this.getData();
                })
            })
        })
    }
    //排序
    handleChange = (pagination, filters, sorter)=>{
        console.log("::" + sorter)
        this.setState({
            sortOrder:sorter.order
        })
    }
    render(){
        const columns = [{
            title: '姓名',
            dataIndex: 'userName',
            key: 'userName',
            width: 120
        },{
            title: '性别',
            dataIndex: 'sex',
            key: 'sex',
            render(sex){
                return sex == 1 ? '男' : '女'
            },
            width: 120
        },{
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
            sorter:(a,b)=>{
                return a.age - b.age;
            },
            sortOrder:this.state.sortOrder,
            width: 120
        },{
            title: '状态',
            dataIndex: 'state',
            key: 'state',
            render(state){
                let config = {
                    '1':'咸鱼一条',
                    '2':'风华浪子',
                    '3':'北大才子',
                    '4':'百度FE',
                    '5':'创业者'
                }
                return config[state]
            },
            width: 120
            
        },{
            title: '地址',
            dataIndex: 'address',
            key: 'address',
            width: 300
        },{
            title: '生日',
            key: 'birthday',
            dataIndex: 'birthday',
            width: 150
        },{
            title: '操作', dataIndex: '', key: 'x', render: () => <a onClick = {this.deleteRow} href="javascript:;">删除</a>,
          },
    ];
    let data = this.state.basicData;
    data.map((item,index) => {
        item.key  = index;
    })
    const columns2 = [
        {
          title: 'Full Name', width: 100, dataIndex: 'name', key: 'name', fixed: 'left',
        },
        {
          title: 'Age', width: 100, dataIndex: 'age', key: 'age', fixed: 'left',
        },
        {
          title: 'Column 1', dataIndex: 'address', key: '1', width: 150,
        },
        {
          title: 'Column 2', dataIndex: 'address', key: '2', width: 150,
        },
        {
          title: 'Column 3', dataIndex: 'address', key: '3', width: 150,
        },
        {
          title: 'Column 4', dataIndex: 'address', key: '4', width: 150,
        },
        {
          title: 'Column 5', dataIndex: 'address', key: '5', width: 150,
        },
        {
          title: 'Column 6', dataIndex: 'address', key: '6', width: 150,
        },
        {
          title: 'Column 7', dataIndex: 'address', key: '7', width: 150,
        },
        { title: 'Column 8', dataIndex: 'address', key: '8' },
        {
          title: 'Action',
          key: 'operation',
          fixed: 'right',
          width: 100,
          render: () => <a href="javascript:;">action</a>,
        },
      ];
      
      const data2 = [];
      for (let i = 0; i < 100; i++) {
        data2.push({
          key: i,
          name: `Edrward ${i}`,
          age: 32,
          address: `London Park no. ${i}`,
        });
      }
return (
            <div>
                <Card title = "固定头部">
                    <Table bordered columns={columns} dataSource = {data}
                    pagination = {this.state.pagination}
                    scroll = {{y:240}}
                    onChange = {this.handleChange}
                    style={{ margin: '10px 0' }}
                    />
                </Card>
                <Card title="左侧固定" style={{ margin: '10px 0' }}>
                    <Table
                        bordered
                        columns={columns2}
                        dataSource={data2}
                        pagination = {this.state.pagination}
                        // scroll={{ x: 1400 }}
                        style={{ margin: '10px 0' }}
                    />
                </Card>
            </div>
        )
    }
}