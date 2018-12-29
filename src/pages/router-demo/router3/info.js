import React from 'react'
export default class Info extends React.Component {

    render() {
        return (
            <div>
                this is Info page
                {this.props.match.params.pageid}
            </div>
        );
    }
}