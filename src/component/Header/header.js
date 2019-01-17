import React from 'react'
import {Row,Col} from 'antd'
import {connect} from 'react-redux'
import './header.less'
import Util from '../../utils/utils'
import Axios from '../../axios/https'
import { from } from 'rxjs';
class Header extends React.Component{
    state = {}
    componentWillMount () {
        this.setState({
            userName : 'yellowYiFeng',
        })
        setInterval(() => {
            let systime = Util.formatDate(new Date().getTime());
            this.setState({
                systime
            })
        },1000);
        // this.getWeather();
    }
    getWeather = () => {
        let city = '苏州';
        let opt = {
            url:'http://api.map.baidu.com/telematics/v3/weather?location='+encodeURIComponent(city)+'&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'

        }
        Axios.JsonP(opt).then((res) => {
            this.setState({
                weatherCity : res[0].currentCity,
                weatherData : res[0].weather_data[0].weather,
                weatherImg : res[0].weather_data[0].dayPictureUrl
            })
        })
    }
    render(){
        return <div className="header">
                    <Row className="header_top">
                        <Col span={23} className="header_top">
                            <span className="user fr">欢迎{this.state.userName}</span>
                        </Col>
                        <Col span={1} className="header_top">
                            <a className="exit red fr">退出</a>
                        </Col>
                    </Row>
                    <Row className="breadCrumb">
                        <Col span={4}>
                            <h3>{this.props.menuName}</h3>
                        </Col>
                        <Col span={20} className="breadCrumb_weather">
                            <div className="weather_date">{this.state.systime}</div>
                            <div className="weather_img"><img src={this.state.weatherImg} /></div>
                            <div className="weather_report">{this.state.weatherCity}</div>
                            <div className="weather_report">{this.state.weatherData}</div>
                        </Col>
                    </Row>
                </div>
    }
}
const mapStateHeader = state => {
    return {
        menuName: state.menuName
    }
}
export default connect(mapStateHeader)(Header)//connect(mapStateToProps,mapDispatchToProps)