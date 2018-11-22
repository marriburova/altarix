import React from 'react';
import Avatar from "./Avatar";

class Message extends React.Component {
    constructor(props) {
        super(props);
        this.messageTime = new Date();
    }

    render() {
        return (
            <div className="message" owner={this.props.owner}>
                <Avatar src={this.props.src} alt={this.props.name}/>
                <div className="messageBlock">
                    <p className="username">{this.props.name}</p>
                    <p className="messageText">{this.props.text}</p>
                    <p className="messageTime">{(this.messageTime.getHours() < 10) ? "0"+this.messageTime.getHours() : this.messageTime.getHours()}:
                        {(this.messageTime.getMinutes() < 10) ? "0"+this.messageTime.getMinutes() : this.messageTime.getMinutes()}:
                        {(this.messageTime.getSeconds() < 10) ? "0"+this.messageTime.getSeconds() : this.messageTime.getSeconds()}</p>
                </div>
            </div>
        );
    }
}

export default Message;