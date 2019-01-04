import React from 'react'
import {Card,Form,Icon, Input,Button,Checkbox,message} from 'antd'
class Login extends React.Component{
    state = {
        userName: '',//用户名
        password: '',//密码
    }
    emitEmpty = () => {
        this.userNameInput.focus();
        this.setState({ userName: '' });
    }
    onChangeUserName = (e) => {
        this.setState({ userName: e.target.value });
    }
    emitEmptyPwd = () => {
        this.passwordInput.focus();
        this.setState({ password: '' });
    }
    onChangePassword = (e) => {
        this.setState({ password: e.target.value });
    }
    //处理登陆
    handleSubmit = () => {
        let userInfo = this.props.form.getFieldsValue();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                message.success(`用户名：${userInfo.userName}，密码：${userInfo.password}`)
            }
        });
    }
    render() {
        let suffix = this.state.userName ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
        let suffixPwd = this.state.password ? <Icon type="close-circle" onClick={this.emitEmptyPwd} /> : null;
        let { getFieldDecorator } = this.props.form;//js属性对象
        return (
            <div>
                <Card title = "登陆水平表单">
                    <Form layout = "inline"  onSubmit = {this.login}> 
                        <Form.Item>
                            <Input
                                placeholder = "请输入用户名"
                                prefix = {<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                suffix = {suffix}
                                value = {this.state.userName}
                                onChange = {this.onChangeUserName}
                                ref = {node => this.userNameInput = node}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                type = 'password'
                                placeholder = "请输入密码"
                                prefix = {<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                suffix = {suffixPwd}
                                value = {this.state.password}
                                onChange = {this.onChangePassword}
                                ref = {node => this.passwordInput = node}
                            />
                        </Form.Item>
                    </Form>
                </Card>
                <Card>
                    <Form className="login-form" style = {{ width: '350px' }}>
                        <Form.Item>
                            {getFieldDecorator('userName', 
                            {
                                initialValue: '',
                                rules: [
                                    { required: true, message: '请输入用户名!' },
                                    { max: 10, min: 5,message: '长度不在范围内'},
                                    { pattern:new RegExp('^\\w+$','g'),message:'用户名必须为字母或者数字'}
                                ],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                initialValue: '',
                                rules: [{ required: true, message: '请输入密码!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator('remember', {
                                    valuePropName:'checked',
                                    initialValue: true
                                })(
                                    <Checkbox>记住密码</Checkbox>
                                )
                            }
                            <a href="#" style={{float:'right'}}>忘记密码</a>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" onClick={this.handleSubmit}>登录</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        )
        
    }
}
export default Form.create()(Login)