import React from 'react'
import {Link} from 'react-router-dom'
export default class HomePage extends React.Component {

    render() {
        return (
            <div>
                this is Home page.
                <Link to="/main/1">嵌套路由1</Link>
                <Link to="/main/2">嵌套路由2</Link>
                {this.props.children}
            </div>
        );
    }
}