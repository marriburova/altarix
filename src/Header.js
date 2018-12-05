import React from 'react';
import Avatar from './Avatar';

const Header = (props) => {
    return (
        <header>
            <Avatar src="https://iwanbazz.github.io/img/avatar.png" alt={props.name} />
            <h1>{props.name}</h1>
        </header>);
}

export default Header;