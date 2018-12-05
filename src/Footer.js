import React from 'react';
import Button from './Button';
import { connect } from 'react-redux';

class Footer extends React.Component {
    constructor() {
        super();
        this.updateMessage = this.updateMessage.bind(this);
    }

    updateMessage = (event) => {
        this.props.dispatch(writeNewMessage(event.target.value));
    }

    onEnterPress = (event) => {
        if (event.key === 'Enter' && !event.ctrlKey) {
            this.handleSubmit(event);
        }
        else if (event.key === "Enter" && event.ctrlKey) {
                event.target.value += "\n";
            }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if (this.props.message !== '') {
            this.props.updateChat({
                id: Date.now(),
                text: this.props.message,
                isOutgoing: true
            });
            this.props.dispatch(writeNewMessage(''));
        }
    }

    render() {
        return (
            <footer>
                <form onSubmit={this.handleSubmit}>
                    <textarea id="inputMessage"
                              name="message"
                              placeholder="Enter your message..."
                              rows="4"
                              value={this.props.newMessage}
                              onChange={this.updateMessage}
                              onKeyDown={this.onEnterPress} />
                    <Button />
                </form>
            </footer>
        );
    }

}
const writeNewMessage = (message) => {
    return {
        type: 'WRITE_MESSAGE',
        payload: message
    }
}
const mapStateToProps = (state) => {
    return {
        newMessage: state.newMessage
    }
}

export default connect(mapStateToProps)(Footer);