import React from 'react'
import axios from '../../axios/https'
import Utils from '../../utils/utils'
import {Table, Modal, message } from 'antd'

export default class BasicTable extends React.Component{
    
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
    //删除行
    deleteRow = (e) => {
        let rows = this.state.selectedRows;
        let ids = [];
        rows.map((item) => {
            ids.push(item.id);
        });
        Modal.info({
            title: '提示',
            content: `确定要删除${ids.join(',')}`,
            onOk : () =>{
                message.success('删除成功')
            }
        });
        this.getData();
        e.stopPropagation();
    }
    //表格排序
    sortTable = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    }
    //点击行
    chooseClickRow = (record,index) => {
        let key = this.state.selectedRowKeys; key.push(index);
        let row = this.state.selectedRows; row.push(record);
        this.setState({
            selectedRowKeys: Utils.uniqueArray(key),//指定选中项的key数组
            selectedRows: Utils.uniqueArray(row)//选中行
        })
    }
    render(){
        const sortedInfo = {
            order: 'descend',
            columnKey: 'age'
        }
        const columns = [{
            title: '姓名',
            dataIndex: 'userName',
            key: 'userName',
        },{
            title: '性别',
            dataIndex: 'sex',
            key: 'sex',
            render(sex){
                return sex == 1 ? '男' : '女'
            }
        },{
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
            sorter: true,
            sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
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
            }
        },{
            title: '地址',
            dataIndex: 'address',
            key: 'address',
        },{
            title: '生日',
            key: 'birthday',
            dataIndex: 'birthday'
        },{
            title: '操作', dataIndex: '', key: 'x', render: () => <a onClick = {this.deleteRow} href="javascript:;">删除</a>,
          },
    ];

        let hasSelected = this.state.selectedRowKeys.length > 0;
        let data = this.state.basicData;
        data.map((item,index) => {
            item.key  = index;
        })
        return (
            <div>
                <div style={{ marginBottom: 16 }}>
                    <span style={{ marginLeft: 8 }}>
                        {hasSelected ? `Selected ${this.state.selectedRowKeys.length} items` : ''}
                    </span>
                </div>
                <Table bordered columns={columns} dataSource = {data}
                onChange = {this.sortTable}
                rowSelection = {{
                        type: 'checkbox',
                        selectedRowKeys:this.state.selectedRowKeys,
                        onChange:(selectedRowKeys,selectedRows)=>{
                            this.setState({
                                selectedRowKeys: selectedRowKeys,
                                selectedRows: selectedRows
                            })
                        }
                    }}
                onRow = {(record,index) => {
                    return {
                        onClick : () => {
                            this.chooseClickRow(record,index)
                        }
                    }
                }}
                pagination = {this.state.pagination}
                />
            </div>
        )
    }
}