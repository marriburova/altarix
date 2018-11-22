import React from 'react';
import Message from "./Message";

class Chat extends React.Component {
    render() {
        return (
            <div className='chat'>
                <Message text="Hello!" name={this.props.name} owner="true" src="https://iwanbazz.github.io/img/avatar.png" />
                <Message text="Hi!" name="Some User" owner="false" src="https://iwanbazz.github.io/img/avatar.png" />
                <Message text="How are you?" name="Some User" owner="false" src="https://iwanbazz.github.io/img/avatar.png" />
                <Message text="My JavaScript is very bad...(((" name={this.props.name} owner="true" src="https://iwanbazz.github.io/img/avatar.png" />
            </div>
        );
    }
}

export default Chat;