import React from 'react';
import Avatar from './Avatar';

class Header extends React.Component {
    render() {
        return (
            <header>
                <Avatar src="https://iwanbazz.github.io/img/avatar.png" alt={this.props.name} />
                <h1>{this.props.name}</h1>
            </header>)
    }
}

export default Header;