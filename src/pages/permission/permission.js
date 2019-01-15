import React from 'react'
import{Card, Button,Modal,Form,Input,Select,Tree,Transfer,message} from 'antd'
import Utils from '../../utils/utils'
import axios from '../../axios/https'
import Etable from '../../component/Etable/etable'
import menuConfig from '../../config/menuconfig'
import DropdownButton from 'antd/lib/dropdown/dropdown-button';
const Option = Select.Option
const TreeNode = Tree.TreeNode

export default class Permission extends React.Component{
    state = {
        createRoleModal: false,
        setAuthModal: false,
        userPerModal: false,
    }
    componentDidMount(){
        this.getPermissionData();
    }
    getPermissionData = () => {
        axios.post('/permission/list',{page:1}).then((res) => {
            this.setState({
                permissionData: res.result.list,
                pagination: Utils.pagination(res,(current) => { 
                    this.setState({page:current})
                    this.getUserList({page:current});
                }),
                checkedKeys: res.result.menus      
            })
        })
    }
    handleOperator = (type) => {
        if(type != 'createRoleModal'){
            let item = this.state.selectedItem;
            if(!item){
                Modal.info({
                    title: '提示',
                    content: '请选择一个员工'
                })
                return;
            }
            if(type == 'userPerModal'){
                this.getRoleAuth(item.roleId);
            }
        }
        this.setState({
            [type]: true
        })
    }
    //提交创建角色
    commitCreateRole = () => {
        let info = this.createForm.props.form.getFieldsValue();
        this.setState({
            createRoleModal: false
        })
        console.log(info);
        
    }
    //提交设置权限
    commitAuthRole = () => {
        this.setState({
            setAuthModal: false
        })
    }
    //获取用户权限
    getRoleAuth(id){
        axios.post('/role/auth',{id:id}).then((res) => {
            if(res.code == 0){
                this.getAuthUserList(res.result);
            }
        })
    }
    //筛选用户
    getAuthUserList = (data) => {
        let targetKeys = [];
        let mockData = [];
        if(data && data.length>0){
            for (let i = 0; i < data.length; i++) {
                const temp = {
                    key: data[i].user_id,
                    title: data[i].user_name,
                    status: data[i].status
                };
            if (data[i].status == 0) {
                targetKeys.push(temp.key); //另一侧的key数组
            }
                mockData.push(temp);
            }
        }
        this.setState({ mockData, targetKeys });
    }
    //提交用户授权
    commitSetRoleAuth = () => {
        let item = this.state.selectedItem;
        let info = {
            userId: item.roleId,
            roleKeys: this.state.targetKeys
        }
        axios.post('/setAuth',info).then((res) => {
            if(res.code == 0){
                message.success('设置成功');
                this.setState({userPerModal:false});
                this.getPermissionData();
            }
        })
        
        console.log(info);
    }
    //重新设置右侧key值
    disPatchKeys = (targetKeys) => {
        this.setState({targetKeys})
    }
    render () {
        let columns = [{
            title: '角色ID',
            dataIndex: 'roleId'
        },{
            title: '角色名称',
            dataIndex: 'roleName',
            render(roleName){
                return {
                    '1': '人力专员',
                    '2': '客服专员',
                    '3': '市场专员',
                    '4': '管理人员',
                    '5': '系统管理员',
                }[roleName]
            }
        },{
            title: '使用状态',
            dataIndex: 'useState',
            render(useState){
                return useState == 0 ? '启用' : '停用';
            }
        },{
            title: '授权人',
            dataIndex: 'permissionMan'
        },{
            title: '授权时间',
            dataIndex: 'permissionTime'
        },{
            title: '创建时间',
            dataIndex: 'createTime'
        }]
        let data = this.state.permissionData || [];
        data.map((item,index) => {
            item.key = index;
        })
        return (
            <div>
                <Card className="wrap-button">
                    <Button type="primary" onClick={() => {this.handleOperator('createRoleModal')}}>创建角色</Button>
                    <Button type="primary" onClick={() => {this.handleOperator('setAuthModal')}}>设置权限</Button>
                    <Button type="primary" onClick={() => {this.handleOperator('userPerModal')}}>用户授权</Button>
                </Card>
                <Etable columns = {columns}
                        dataSource = {data}
                        rowSelection = "radio"
                        pagination = {this.state.pagination}
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        selectedRowKeys={this.state.selectedRowKeys}/>
                <Modal title="创建角色"
                        style={{ top: 20 }}
                        visible={this.state.createRoleModal}
                        onOk={this.commitCreateRole}
                        onCancel = {() => {
                            this.setState({
                                createRoleModal: false,
                            });
                            this.createForm.props.form.resetFields();
                        }}>
                        <CreateRoleForm wrappedComponentRef = {(ins) => this.createForm = ins }  />
                </Modal>
                <Modal title="设置权限"
                        style={{ top: 20 }}
                        visible={this.state.setAuthModal}
                        onOk={this.commitAuthRole}
                        onCancel = {() => {
                            this.setState({
                                setAuthModal: false,
                            });
                            this.setAuthForm.props.form.resetFields();
                        }}>
                    <AuthRoleForm 
                        checkedKeys = {this.state.checkedKeys}
                        wrappedComponentRef = {(ins) => this.setAuthForm = ins } 
                        upDateCheckedKeys = {(keys) => {this.setState({checkedKeys:keys})}}
                        selectedItem = {this.state.selectedItem}/>
                </Modal>
                <Modal title="用户授权"
                        style={{ top: 20 }}
                        visible={this.state.userPerModal}
                        onOk={this.commitSetRoleAuth}
                        onCancel = {() => {
                            this.setState({
                                userPerModal: false,
                            });
                            this.setRoleAuthForm.props.form.resetFields();
                        }}>
                        <SetRoleAuthForm 
                        wrappedComponentRef = {(ins) => this.setRoleAuthForm = ins } 
                        selectedItem = {this.state.selectedItem}
                        mockData = {this.state.mockData}
                        targetKeys = {this.state.targetKeys}
                        disPatchKeys = {this.disPatchKeys}/>

                </Modal>
                
                
            </div>
        )
    }
}
class CreateRoleForm extends React.Component{

    render () {
        let formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 18}
        }
        let {getFieldDecorator} = this.props.form;
        return (
            <div>
                <Form>
                    <Form.Item label = "角色名称" {...formItemLayout}>{
                        getFieldDecorator('roleName',{
                            initialValue: '',
                            rules: [
                                {
                                    required: true,
                                    message: '角色名称不能为空'
                                }
                            ]
                        })(<Input type="text" placeholder = "请填写" />)
                    }
                    </Form.Item>
                    <Form.Item label = "状态" {...formItemLayout}>{
                        getFieldDecorator('state',{
                            initialValue: '0',
                            rules: [
                                {
                                    required: true,
                                    message: '请选择角色状态'
                                }
                            ]
                        })(
                            <Select>
                                <Option value={0}>开启</Option>
                                <Option value={1}>关闭</Option>
                            </Select>
                        )
                    }
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
CreateRoleForm = Form.create({})(CreateRoleForm);

class AuthRoleForm extends React.Component{
    state = {value: ['0-0-0'],}
    onChange = (value) => {
        console.log('onChange ', value);
        this.setState({ value });
    }
    //获取菜单项
    renderMenuConfigTree = (data) => {
        return data.map((item) => {
            if(item.children){
                return <TreeNode title = {item.title} key = {item.key}>{this.renderMenuConfigTree(item.children)}</TreeNode>
            }else{
                return <TreeNode title = {item.title} key = {item.key}></TreeNode>
            }
        })
    }
    //获取选中元素传给父元素
    onCheck = (keys) => {
        this.props.upDateCheckedKeys(keys);
        
    }
    render () {
        let formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 18}
        }
        let {getFieldDecorator} = this.props.form;
        let menuInfo = this.props.checkedKeys;
        let item = this.props.selectedItem;
        return(
            <div>
                    <Form>
                        <Form.Item label = "角色名称" {...formItemLayout}>{
                            getFieldDecorator('roleName',{
                                initialValue: {
                                    '1': '人力专员',
                                    '2': '客服专员',
                                    '3': '市场专员',
                                    '4': '管理人员',
                                    '5': '系统管理员',
                                }[item.roleName],
                            })(<Input type="text" placeholder = "请填写" disabled />)
                        }
                        </Form.Item>
                        <Form.Item label = "状态" {...formItemLayout}>{
                            getFieldDecorator('state',{
                                initialValue: item.useState,
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择角色状态'
                                    }
                                ]
                            })(
                                <Select>
                                    <Option value={0}>开启</Option>
                                    <Option value={1}>关闭</Option>
                                </Select>
                            )
                        }
                        </Form.Item>
                    </Form>
                    <Tree
                        checkable  //是否在treeNodes上显示复选框
                        defaultExpandAll //是否默认扩展所有treeNodes
                        onCheck={(checkedKeys)=>this.onCheck(checkedKeys)}
                        checkedKeys={menuInfo ||[]}
                    >
                        <TreeNode title="平台权限" key="platform_all">
                            {this.renderMenuConfigTree(menuConfig)}
                        </TreeNode>
                    </Tree>
            </div>
        )
    }
}
AuthRoleForm = Form.create({})(AuthRoleForm);

class SetRoleAuthForm extends React.Component{
    state = {}
    //确定项目是否应显示在搜索结果列表中的函数	
    filterOption = (inputValue,option) => {
        return option.title.indexOf(inputValue) > -1;
    }
    //交换列时的回调函数
    handleChange = (targetKeys) => {
        this.props.disPatchKeys(targetKeys)
    }
    render () {
        return (
            <div>
                <Transfer
                    listStyle={{width: 200,height: 400}}
                    dataSource={this.props.mockData}
                    showSearch
                    titles={['待选用户', '已选用户']}
                    searchPlaceholder='输入用户名'
                    filterOption={this.filterOption}
                    targetKeys={this.props.targetKeys}
                    onChange={this.handleChange}
                    render={item => item.title}
                />
             </div>
        )
    }
}
SetRoleAuthForm = Form.create({})(SetRoleAuthForm);