import React from 'react';
import Avatar from "./Avatar";

class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messageTime: new Date()
        };
    }
    componentWillMount() {
        this.state.messageTime.setTime(this.props.time);
    }
    render() {
        return (
            <div className="message" data-isoutgoing={this.props.isoutgoing}>
                <Avatar src="https://iwanbazz.github.io/img/avatar.png" alt={this.props.name}/>
                <div className="messageBlock">
                    <p className="username">{this.props.name}</p>
                    <p className="messageText">{this.props.text.toString()}</p>
                    <p className="messageTime">{this.state.messageTime.toLocaleDateString()} {this.state.messageTime.toLocaleTimeString()}</p>
                </div>
            </div>
        );
    }
}

export default Message;