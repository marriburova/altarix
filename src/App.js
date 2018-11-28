import React from 'react';
import './App.css';
import Header from './Header';
import Chat from './Chat';
import Footer from './Footer';
import { db } from './firebase';

const currentUser = "Мария Бурова";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { messages: [] };
        this.updateChat = this.updateChat.bind(this);
    }

    componentDidMount() {
        const messagesRef = db.ref('messages');

        messagesRef.on('value', (snapshot) => {
            const messages = snapshot.val();

            for (let key in messages) {
                let isOutgoing = false;
                if (messages[key].name === currentUser) isOutgoing = true;

                this.setState({
                    messages: [...this.state.messages, {
                        id: messages[key].id,
                        name: messages[key].name,
                        text: messages[key].text,
                        isOutgoing: isOutgoing
                    }]
                });
            }
        })
    }

    updateChat (newMessage) {
        if (newMessage.isOutgoing) {
            newMessage.name=currentUser;
        }
        db.ref(`/messages/${Date.now()}`).set(newMessage);
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
