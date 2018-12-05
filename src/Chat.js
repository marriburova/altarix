import React from 'react';
import Message from "./Message";

const Chat = (props) => {
    return (
        <div className="chat">
            { props.messages.map((message) => {
                    return <Message key={message.id} name={message.name} text={message.text} isoutgoing={message.isOutgoing} time={message.id} />
                }
            )}
        </div>
    );
}


export default Chat;