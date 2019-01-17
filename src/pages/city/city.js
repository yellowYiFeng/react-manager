import React from 'react'
import { Select ,Form , Button, Table,Modal,Radio,}  from 'antd';
import axios from '../../axios/https'
import Utils from '../../utils/utils'
const RadioGroup = Radio.Group;
const Option = Select.Option;

export default class City extends React.Component{
    state = {
        openCity: false
    }
     //开通城市
     handelOpen = (type) => {
        this.setState({
            [type]: true
        })
    }
    //开通城市提交
    submitOpenCity = () => {
        let param = this.cityForm.props.form.getFieldsValue();
        console.log(param)
    }
    //搜索
    searchTable = () => {
        let info = this.filterForm.props.form.getFieldsValue();
        console.log(info)

    }
    render () {
        return (
            <div>
                <div style={{clear:"both",overflow:"hidden"}}>
                    <div className="fl"><FilterForm wrappedComponentRef={(inst)=>{this.filterForm = inst;}} /></div>
                    <div className="fr">
                        <Button type="primary" className="mr5" onClick={this.searchTable}>查询</Button>
                        <Button type="default">重置</Button>
                    </div>
                </div>
                
                
                <Button className="mb20" type="primary" onClick = {() => {this.handelOpen('openCity')}}>开通城市</Button>
                <TableForm />
                <Modal title = "开通城市" visible = {this.state.openCity} onOk = {() => {
                    this.setState({
                        openCity: false
                    })
                    this.submitOpenCity();
                }}
                onCancel = {() => {
                    this.setState({
                        openCity: false
                    })
                }}>
                <OpenCityForm wrappedComponentRef={(inst)=>{this.cityForm = inst;}} />
                </Modal>
            </div>
        )
    }
}
class FilterForm extends React.Component{
    render () {
        let formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 18}
        }
        let {getFieldDecorator} = this.props.form;
        return (
            <div className="mb20">
                <Form layout = "inline">
                    <Form.Item label = "城市:" {...formItemLayout}> {
                        getFieldDecorator('city',{
                            initialValue: ''
                        })(
                            <Select placeholder="全部" style={{ width: 120 }}>
                                <Option value="">全部</Option>
                                <Option value="1">北京</Option>
                                <Option value="2">天津</Option>
                            </Select>
                        )
                    }
                    </Form.Item>
                    <Form.Item label = "用车模式:" {...formItemLayout}>{
                        getFieldDecorator('carMode',{
                            initialValue: ''
                        })(
                            <Select placeholder="全部"  style={{ width: 120 }}>
                                <Option value="">全部</Option>
                                <Option value="1">指定停区模式</Option>
                                <Option value="2">禁停区模式</Option>
                            </Select>
                        )
                    }
                    </Form.Item>
                    <Form.Item label = "营运模式:" {...formItemLayout}>{
                        getFieldDecorator('saleMode',{
                            initialValue: ''
                        })(
                            <Select placeholder="全部"  style={{ width: 120 }}>
                                <Option value="">全部</Option>
                                <Option value="1">自营</Option>
                                <Option value="2">加盟</Option>
                            </Select>
                        )
                    }
                    </Form.Item>
                    <Form.Item label = "加盟商授权状态:" {...formItemLayout}>{
                        getFieldDecorator('author',{
                            initialValue: ''
                        })(
                            <Select placeholder="全部"  style={{ width: 120 }}>
                                <Option value="">全部</Option>
                                <Option value="1">已授权</Option>
                                <Option value="2">未授权</Option>
                            </Select>
                        )
                    }
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
FilterForm = Form.create({})(FilterForm)

class TableForm extends React.Component{
    state = {
        tableData: [],
    }
    param = {

    }
    componentDidMount(){
        this.getTableData();
    }
    //获取表格数据
    getTableData = () => {
        let _this = this;
        axios.post('/city/list',_this.param).then((res) => {
            this.setState({
                tableData: res.result.list,
                pagination: Utils.pagination(res,(current)=>{
                    _this.param.page = current;
                    this.getTableData();
                })
            })
        })
    }
    render () {
        let columns = [
            {
                title: '城市ID',
                dataIndex: 'id',
                key: 'id',
            },{
                title: '城市名称',
                dataIndex: 'cityName',
                key: 'cityName',
            },{
                title: '用车模式',
                dataIndex: 'carMode',
                key: 'carMode',
                render(carMode){
                    return carMode == 0 ? '停车点' : '禁停区'
                }
            },{
                title: '营运模式',
                dataIndex: 'saleMode',
                key: 'saleMode',
                render(carMode){
                    return carMode == 0 ? '松果自营' : '平谷自营'
                }
            },{
                title: '授权加盟商',
                dataIndex: 'author',
                key: 'author',
                render(author){
                    return author == 0 ? '自营' : '加盟'
                }
            },{
                title: '城市管理员',
                dataIndex: 'manager',
                key: 'manager',
            },{
                title: '城市开通时间',
                dataIndex: 'openTime',
                key: 'openTime',
            },{
                title: '操作时间',
                dataIndex: 'workTime',
                key: 'workTime',
            },{
                title: '操作人',
                dataIndex: 'workMan',
                key: 'workMan',
            }
        ]
        let data = this.state.tableData;
        data.map((item,index) => {
            item.key = index
        })
        return (
            <div className="mb20">
                <Form>
                    <Form.Item>
                        <Table bordered
                            columns = {columns}
                            dataSource = {data}
                            pagination = {this.state.pagination}
                        />
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
class OpenCityForm extends React.Component{
    render () {
        let formItemLayout = {
            labelCol:{
                xs:24,
                sm:4
            },
            // wrapperCol:{
            //     xs:24,
            //     sm:12
            // }
        }
        let {getFieldDecorator} = this.props.form;
        return (
            <div>
                <Form layout="horizontal">
                    <Form.Item label="选择城市" {...formItemLayout}>{
                        getFieldDecorator('city',{
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择城市'
                                    }
                                ]
                        })(
                            <Select placeholder="全部" style={{ width: 120 }}>
                                <Option value="">全部</Option>
                                <Option value="1">北京</Option>
                                <Option value="2">天津</Option>
                            </Select>
                        )
                    }
                    </Form.Item>
                    <Form.Item label="营运模式" {...formItemLayout}>{
                        getFieldDecorator('saleMode',{
                            initialValue: '1'
                        })(
                            <RadioGroup>
                                <Radio value="1">自营</Radio>
                                <Radio value="2">加盟</Radio>
                            </RadioGroup>
                        )
                    }
                    </Form.Item>
                    <Form.Item label="用车模式" {...formItemLayout}>{
                        getFieldDecorator('carMode',{
                            initialValue: '1'
                        })(
                            <RadioGroup>
                                <Radio value="1">指定停车点模式</Radio>
                                <Radio value="2">禁停区模式</Radio>
                            </RadioGroup>
                        )
                    }
                    </Form.Item>
                </Form>
            </div>
        )
    } 
}
OpenCityForm = Form.create({})(OpenCityForm)

