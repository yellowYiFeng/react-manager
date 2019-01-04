import React from 'react'
import {Card,Button,Modal} from 'antd'
export default class Modals extends React.Component{
    state = { 
        visible1: false,//基础模态框
        visible2: false,//自定义页脚
        visible3: false,//自定义距离顶部高度
        visible4: false,//水平居中

    }
    handelOpen = (type) => {
        this.setState({
          [type]: true
        });
    }
    handleConfirm = (type) => {
        Modal[type]({
            title: 'This is a notification message',
            content: (
            <div>
                <p>some messages...some messages...</p>
                <p>some messages...some messages...</p>
            </div>
            ),
            onOk() {},
            onCancel() {},
        })
    }
    render(){
        return (
            <div>
                <Card title="基础模态框">
                    <Button type="primary" onClick = {() => {this.handelOpen('visible1')}}>open</Button>
                    <Button type="primary" onClick = {() => {this.handelOpen('visible2')}}>自定义页脚按钮属性</Button>
                    <Button type="primary" onClick = {() => {this.handelOpen('visible3')}}>自定义距离顶部高度</Button>
                    <Button type="primary" onClick = {() => {this.handelOpen('visible4')}}>水平居中</Button>
                </Card>
                <Card title="信息确认">
                    <Button type="primary" onClick={() => this.handleConfirm('confirm')}>Confirm</Button>
                    <Button type="primary" onClick={() => this.handleConfirm('info')}>Info</Button>
                    <Button type="primary" onClick={() => this.handleConfirm('success')}>Success</Button>
                    <Button type="primary" onClick={() => this.handleConfirm('warning')}>Warning</Button>
                </Card>
                <Modal title = "Basic Modal" visible = {this.state.visible1} onOk = {() => {
                        this.setState({
                            visible1: false
                        })
                    }}
                    onCancel = {() => {
                        this.setState({
                            visible1: false
                        })
                    }}>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </Modal>
                    <Modal
                        title = "Basic Modal 2"
                        okText = '好的'
                        cancelText = '算了'
                        visible = {this.state.visible2}
                        onOk = {() => {
                            this.setState({
                                visible2: false
                            })
                        }}
                        onCancel = {() => {
                            this.setState({
                                visible2: false
                            })
                        }}
                        okButtonProps = {{ disabled: true }}
                        cancelButtonProps = {{ disabled: true }}>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </Modal>
                    <Modal
                        title="20px to Top"
                        style={{ top: 20 }}
                        visible={this.state.visible3}
                        onOk={() => this.setState({visible3: false})}
                        onCancel={() => this.setState({visible3: false})}
                        >
                        <p>some contents...</p>
                        <p>some contents...</p>
                        <p>some contents...</p>
                    </Modal>
                    <Modal
                        title="Vertically centered modal dialog"
                        centered
                        visible={this.state.visible4}
                        onOk={() => this.setState({visible4: false})}
                        onCancel={() => this.setState({visible4: false})}
                        >
                        <p>some contents...</p>
                        <p>some contents...</p>
                        <p>some contents...</p>
                    </Modal>
            </div>
        )
        
    }
}