import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {

  constructor(props){
    super(props);
    this.socket = new WebSocket('ws://localhost:3001');

    this.socket.addEventListener('message', (event) => {
      //after server passes an object as a string later in the code,
      //I need to reverse it back to an object
      const msg = JSON.parse(event.data);

      //Add msg to the state;
      var stateNew = this.state.messages.concat(msg);
      this.setState({ messages: stateNew });
    });

    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };

    //force the context of sendNewMessage to refer to "this" in the contructor
    this.sendNewMessage = this.sendNewMessage.bind(this);
    }

handleChange(e) {
  if(e.key === "Enter"){
    const oldName = this.state.currentUser.name;
    const userName = e.target.value;
    //This will make sure the state is corrent when I send the notification to server
    this.setState({
      currentUser: {
        name: userName
      }
    });
    const note = {
      type: "postNotification",
      content: `${oldName} was changed to ${userName}`
    }
    this.socket.send(JSON.stringify(note));
  }

}
sendNewMessage(messageWithUser){

  //Construct a msg object containing the data that server needs to process the message from the chat client
  const msg = {
    type: "postMessage",
    username: this.state.currentUser.name,
    content: messageWithUser
  };
  //Send the msg object as a JSON-formatted string
  this.socket.send(JSON.stringify(msg));



//Blank the text input element, ready to receive the next line of text from the user

}

componentDidMount() {
  console.log("componentDidMount <App />");
  setTimeout(() => {
    console.log("Simulating incoming message");
// Add a new message to the list of messages in the data store
    const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    const messages = this.state.messages.concat(newMessage);
// Update the state of the app component.
// Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages})
  }, 3000);
}

render() {
  return (
    <div>
    <ChatBar userName={this.state.currentUser.name} enterName={ this.handleChange.bind(this) } enterTrigger={this.sendNewMessage}/>
    <NavBar />
    <MessageList messages={this.state.messages} />
    </div>
    );
}
}

export default App;