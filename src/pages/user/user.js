import React from 'react'
import{Card, Button,Modal,Form,message,Input,Select, Radio} from 'antd'
import Utils from '../../utils/utils'
import axios from '../../axios/https'
import BaseForm from '../../component/BaseForm/baseForm'
import Etable from '../../component/Etable/etable'
import RadioGroup from 'antd/lib/radio/group';
const Option = Select.Option
export default class User extends React.Component{
    state = {
        isVisible: false
    }
    componentDidMount(){
        this.getUserList({page:1});
    }
    getUserList = (data) => {
        axios.post('/user/list',data).then((res) => {
            this.setState({
                userListData: res.result.list,
                pagination: Utils.pagination(res,(current) => {
                    this.setState({page:current})
                    this.getUserList({page:current});
                })
            })
        }).catch((err) => {console.log(err)})
    }
    //打开modal
    handleOperator = (type) => {
        let item = this.state.selectedItem;
        if(type == 'create'){
            this.setState({
                title: '创建员工',
                type,
                isVisible: true,
                userInfo: {}
            })
        }else if(type == 'edit' || type == 'detail'){
            if(!item){
                Modal.info({
                    title: '提示',
                    content: '请选择一个员工'
                })
                return;
            }else{
                this.setState({
                    title: type == 'edit' ? '编辑员工' : '员工详情',
                    isVisible: true,
                    type,
                    userInfo: item
                })
            }
        }else if(type == 'delete'){
            if(!item){
                Modal.info({
                    title: '提示',
                    content: '请选择一个员工'
                })
                return;
            }else{
                Modal.confirm({
                    title: '提示',
                    content: '确定删除此员工吗？',
                    onOk: () => {
                        axios.post('/user/delete',{id:item.id}).then((res) => {
                            if(res.code == 0){
                                message.success("删除成功");
                                this.getUserList({page:this.state.page})
                            }else{
                                message.error(res.msg);
                            }
                        })
                    }
                })
                
            }
        }
    }
    //新增/编辑员工
    handleSubmit = () => {
        let type = this.state.type;
        let info = this.ModalForm.props.form.getFieldsValue();
        let url = type == 'create' ? '/user/add' : '/user/edit';
        axios.post(url,info).then((res) => {
            message.success('success');
            this.setState({
                isVisible: false,
                userInfo: {}
            })
            this.ModalForm.props.form.resetFields();
        })
    }
    //查询表格
    submitFilter = (data) => {
        this.getUserList(data);
    }
    filterList = [{
        type: 'INPUT',
        label: '',
        field: 'user_name',
        placeholder: '请输入用户名',
        width: 80,
        id: 0
    },{
        type: 'INPUT',
        label: '',
        field: 'user_mobile',
        placeholder: '请输入手机号',
        width: 80,
        id: 1
    },{
        type: 'DATE',
        label: '',
        field: 'user_date',
        placeholder: '请选择日期',
        width: 80,
        id: 2
    }]
    
    render () {
        let data = this.state.userListData || [];
        data.map((item,index) => {
            item.key = index
        })
        const columns = [{
            title: 'id',
            dataIndex: 'id'
        },{
            title: '用户名',
            dataIndex: 'userName'
        },{
            title: '性别',
            dataIndex: 'sex',
            render(sex){
                return sex == 0 ? '男' : '女';
            }
        },{
            title: '状态',
            dataIndex: 'user_status',
            render(user_status){
                let config = {
                    '0': '有为青年',
                    '1': '潜力股',
                    '2': '业界精英'
                }
                return config[user_status];
            }
        },{
            title: '爱好',
            dataIndex: 'interest',
            render(interest){
                let config = {
                    '0': '运动',
                    '1': '音乐',
                    '2': '旅游'
                }
                return config[interest];
            }
        },{
            title: '婚姻',
            dataIndex: 'marage',
            render(marage){
                return marage == 0 ? '已婚' : '未婚';
            }
        },{
            title: '上班时间',
            dataIndex: 'getuptime'
        },{
            title: '出生日期',
            dataIndex: 'birth'
        }
        ]
        console.log(this.state.userInfo)
        return (
            <div>
                <Card>
                    <BaseForm filterList = {this.filterList} submitFilter = {this.submitFilter} /> 
                </Card>
                <Card className="wrap-button">
                    <Button type="primary" onClick={() => {this.handleOperator('create')}}>创建员工</Button>
                    <Button type="primary" onClick={() => {this.handleOperator('edit')}}>编辑员工</Button>
                    <Button type="primary" onClick={() => {this.handleOperator('detail')}}>员工详情</Button>
                    <Button type="default" onClick={() => {this.handleOperator('delete')}}>删除员工</Button>
                </Card>
                <div>
                    <Etable columns = {columns}
                            dataSource = {data}
                            rowSelection = "radio"
                            updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                            selectedRowKeys={this.state.selectedRowKeys}
                            />
                </div>
                <Modal
                    title={this.state.title}
                    style={{ top: 20 }}
                    visible={this.state.isVisible}
                    onOk={this.handleSubmit}
                    onCancel = {() => {
                        this.setState({
                            isVisible: false,
                            userInfo: {}
                        });
                        this.ModalForm.props.form.resetFields();
                    }}
                    >
                    <ModalForm 
                        type = {this.state.type}
                        userInfo = {this.state.userInfo || {}}
                        wrappedComponentRef = {(ins) => this.ModalForm = ins } 
                        />
                </Modal>

            </div>
        )
    }
}
class ModalForm extends React.Component{
    getState = (state) => {
        return {
            '0': '有为青年',
            '1': '潜力股',
            '2': '业界精英' 
        }[state]
    }
    render () {
        let formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 18}
        }
        let {getFieldDecorator} = this.props.form;
        let userInfo = this.props.userInfo;
        let type = this.props.type;
        return (
            <div>
                <Form>
                    <Form.Item label = "姓名" key = "user_name" {...formItemLayout}>{
                        type == 'detail' ? userInfo.userName : 
                        getFieldDecorator('user_name',{
                            initialValue: userInfo.userName,
                        })(
                            <Input type="text" placeholder = "请填写" />
                        )
                    }
                    </Form.Item>
                    <Form.Item label = "性别" key = "user_sex" {...formItemLayout}>{
                        type == 'detail' ? userInfo.sex == 0 ? '男' : '女' : 
                        getFieldDecorator('sex',{
                            initialValue: userInfo.sex,
                        })(
                            <RadioGroup>
                                <Radio value={0}>男</Radio>
                                <Radio value={1}>女</Radio>
                            </RadioGroup>
                        )
                    }
                    </Form.Item>
                    <Form.Item label = "状态" key = "user_state" {...formItemLayout}>{
                        type == 'detail' ? this.getState(userInfo.user_status) : 
                        getFieldDecorator('user_status',{
                            initialValue: userInfo.user_status,
                        })(
                            <Select>
                                <Option value={0}>有为青年</Option>
                                <Option value={1}>潜力股</Option>
                                <Option value={2}>业界精英</Option>
                            </Select>
                        )
                    }
                    </Form.Item>
                    <Form.Item label = "生日" key = "user_birth" {...formItemLayout}>{
                        type == 'detail' ? (userInfo.birth) : 
                        getFieldDecorator('birth',{
                            initialValue: userInfo.birth,
                        })(
                            <Input type="text" placeholder = "请填写" />
                        )
                    }
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
ModalForm = Form.create({})(ModalForm)