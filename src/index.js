import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const reducer = (state, action) => {
    switch (action.type) {
        case 'NEW_MESSAGE':
            return Object.assign({}, state, {
                messages: action.payload
            })
        case 'WRITE_MESSAGE':
            return Object.assign({}, state, {
                newMessage: action.payload
            })
        default:
            return state;
    }
};

const store = createStore(reducer, { messages: [], newMessage: '' });

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));
