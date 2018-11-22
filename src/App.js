import React from 'react';
import './App.css';
import Header from './Header';
import Chat from './Chat';
import Footer from './Footer';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header className="header" name="marriburova" />
        <Chat name="Some User 1"/>
        <Footer />
      </div>
    );
  }
}

export default App;
