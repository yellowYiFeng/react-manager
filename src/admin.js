import React from 'react'
import {Row, Col } from 'antd'
import Header from  './component/Header/header'
import Footer from'./component/Footer/footer'
import NavLeft from'./component/NavLeft/navleft'


export default class Admin extends React.Component{
    render(){
        return (
            <div>
                <Row className="container">
                    <Col span={3} className="nav_left"><NavLeft/></Col>
                    <Col span={21} className="main">
                        <Header/>
                        <Row className="content">
                            content
                            {/* {this.props.children} */}
                        </Row>
                        <Footer/>
                    </Col>
                </Row>
            </div>
        )
    }
}