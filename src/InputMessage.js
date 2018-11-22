import React from 'react';

class InputMessage extends React.Component {
    render() {
        return (
            <textarea name="message" rows="4" placeholder="Enter your message..."></textarea>
        );
    }
}

export default InputMessage;