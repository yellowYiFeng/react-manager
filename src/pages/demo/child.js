import React from 'react'
export default class Child extends React.Component{
    render(){
        return <div>
            <p>{this.props.name}</p>
        </div>
    }
}