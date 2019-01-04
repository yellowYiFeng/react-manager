import React from 'react'
import {Card,Form,Icon, Input,Button} from 'antd'
import { from } from 'rxjs';
export default class Login extends React.Component{
    state = {
        userName: '',//用户名
        password: '',//密码
    }
    emitEmpty = () => {
        this.userNameInput.focus();
        this.setState({ serName: '' });
    }
    onChangeUserName = (e) => {
        this.setState({ serName: e.target.value });
    }
    render() {
        let suffix = this.state.userName ? '<Icon type="close-circle" onClick={this.emitEmpty} />' : null;
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
                    </Form>
                </Card>
            </div>
        )
        
    }
}