import React from 'react';
import Button from './Button';

class Footer extends React.Component {
    constructor() {
        super();
        this.state = { message: '' };
        this.updateMessage = this.updateMessage.bind(this);
    }

    updateMessage = (event) => {
        this.setState({ message: event.target.value });
    }

    onEnterPress = (event) => {
        if(event.key === 'Enter' && !event.ctrlKey) {
            event.preventDefault();

            if (this.state.message !== '') {
                this.props.updateChat(this.state.message);
                this.setState({ message: ''});
            }
        } else if (event.key === "Enter" && event.ctrlKey) {
            event.target.value += "\n";
        }
    }

    render() {
        return (
            <footer>
                <form onSubmit={(event) => {
                    event.preventDefault();
                    if (this.state.message !== '') {
                        this.props.updateChat(this.state.message);
                        this.setState({ message: ''});
                    }
                }}>
                    <textarea id="inputMessage"
                              name="message"
                              placeholder="Enter your message..."
                              rows="4"
                              value={this.state.message}
                              onChange={this.updateMessage}
                              onKeyDown={this.onEnterPress} />
                    <Button />
                </form>
            </footer>
        );
    }

}

export default Footer;