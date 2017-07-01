// server.js

const express = require('express');
const WebSocket = require('ws');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

// Create the WebSockets server
const wss = new SocketServer({ server });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};
const colourList = ['#2E5894', '#FF5470', "#804040"];
let count = 0;
function getUserColour() {
  return colourList[count % colourList.length];
}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  //Create a funciton to generate random colour
  count += 1;
  const colour = getUserColour();

  let userCount = {
    type: 'userCount',
    count: count
  }
  wss.broadcast(JSON.stringify(userCount));

  ws.on('message', function (text) {
    const msgBroadCast = JSON.parse(text);
    //Check if no proper type => error out
    //Check for message type.
    if (msgBroadCast.type === "postNotification") {
      //Send a notification back to client
      msgBroadCast.type = "incomingNotification";
    }
    if (msgBroadCast.type === "postMessage") {
      // Broadcast the message to everyone(all connected browser)
      //convert it back to object
      msgBroadCast.type = "incomingMessage";

    }
    msgBroadCast.id = uuidv1();
    msgBroadCast.color = colour;
    wss.broadcast(JSON.stringify(msgBroadCast));
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    count -= 1;
    let userCount = {
      type: 'userCount',
      count: count
    }
    wss.broadcast(JSON.stringify(userCount));
  });
});