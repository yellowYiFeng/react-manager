import React from 'react'
import {connect} from 'react-redux'
import {Row,Button} from 'antd'
import { dealCount } from '../../redux/action/action'

class Footer extends React.Component{
    handleClick = (count) => {
        let data  =  count+1
        this.props.onSwitchCount(data)
    }
    render(){
        return <div className="footer">
                    版权所有：XXXXXXX（推荐使用谷歌浏览器，可以获得更佳操作页面体验） 技术支持：XXXX
                    <Row>
                        <Button onClick={this.handleClick.bind(this,this.props.count)}>增加</Button>
                        <span>{this.props.count}</span>
                    </Row>
                </div>
    }
}
const mapStateFooter= state => {
    return {
        count: state.count
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
      onSwitchCount: (count) => {
        dispatch({ type: 'DEALCOUNT', count: count })
      }
    }
  }
export default connect(mapStateFooter,mapDispatchToProps)(Footer)//connect(mapStateToProps,mapDispatchToProps)