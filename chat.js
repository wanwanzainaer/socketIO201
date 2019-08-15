const express = require("express");
const app = express();
const socketio = require("socket.io");

// app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(5000, () => {
  console.log("connect!");
});
const io = new socketio(expressServer);
io.on("connection", socket => {
  //   console.log(socket);
  socket.emit("messageFromServer", {
    data: "Welcome to the socketio server"
  });
  socket.on("dataToServer", dataFromClient => {
    console.log(dataFromClient);
  });
  socket.on("senNewMessageToServer", msg => {
    io.emit("receiveFromServer", { text: msg.text });
  });
});
