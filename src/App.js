import React from 'react';
import './App.css';
import Header from './Header';
import Chat from './Chat';
import Footer from './Footer';

const currentUser = "marriburova";

const messagesArray = [
    {
        id: Date.now(),
        name: currentUser,
        text: 'Hello',
        isOutgoing: true
    },
    {
        id: Date.now()+1000,
        name: 'someuser',
        text: 'hi',
        isOutgoing: false
    }
];

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { messages: messagesArray };
        this.updateChat = this.updateChat.bind(this);
    }

    updateChat (newMessage) {
        this.setState({
            messages: [...this.state.messages, {
                id: Date.now(),
                name: currentUser,
                text: newMessage,
                isOutgoing: true
            }]
        });
    }

    render() {
        return (
            <div className='App'>
            <Header name={currentUser} />
        <Chat messages={this.state.messages} />
        <Footer messages={this.state.messages} updateChat={this.updateChat} />
        </div>
    );
    }
}

export default App;
