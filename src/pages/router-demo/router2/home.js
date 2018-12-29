import React from 'react'
import {Link} from 'react-router-dom'
export default class HomePage extends React.Component {

    render() {
        return (
            <div>
                this is Home page.
                <Link to="/main/a">嵌套路由</Link>
                {this.props.children}
            </div>
        );
    }
}