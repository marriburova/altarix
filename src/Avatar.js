import React from 'react';

class Avatar extends React.Component {
    render() {
        const {src} = this.props;
        return <div className="avatar"><img src={src} alt={this.props.alt} /></div>
    }
}

export default Avatar;