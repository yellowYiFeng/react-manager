import React from 'react'
import './life.css'
import Child from './child'
export default class Life extends React.Component{
    state = {
        count : 0
    }
    handleClick = () => {
        this.setState({
            count : this.state.count +1
        })
    }
    render(){
        return <div className="content">
            <p>react生命周期</p>
            <p>{this.state.count}</p>
            <button onClick={this.handleClick}>点击一下</button>
            <Child name="huangyifeng"></Child>
        </div>
    }
}