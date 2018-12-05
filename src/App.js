import React from 'react';
import './App.css';
import Header from './Header';
import Chat from './Chat';
import Footer from './Footer';
import { db } from './firebase';
import { connect } from 'react-redux';

const currentUser = "Мария Бурова";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.updateChat = this.updateChat.bind(this);
    }

    componentDidMount() {
        const messagesRef = db.ref('messages');

        messagesRef.on('value', (snapshot) => {
            const messages = snapshot.val();
            const newState = [];

            for (let key in messages) {
                let isOutgoing = false;

                if (messages[key].name === currentUser) isOutgoing = true;
                newState.push({
                    id: messages[key].id,
                    name: messages[key].name,
                    text: messages[key].text,
                    isOutgoing: isOutgoing
                });
            }
            this.props.dispatch(addNewMessages(newState));
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
                <Chat messages={this.props.messages} />
                <Footer messages={this.props.messages} updateChat={this.updateChat} />
            </div>
        );
    }
}

const addNewMessages = (messages) => {
    return {
        type: 'NEW_MESSAGE',
        payload: messages
    }
}

const mapStateToProps = (state) => {
    return {
        messages: state.messages
    }
}

export default connect(mapStateToProps)(App);
