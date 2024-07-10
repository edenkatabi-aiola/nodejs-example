const express = require('express');
const { createServer } = require('node:http');
const app = express();
const { Server } = require("socket.io");


const port = 3000
const server = createServer(app);
const io = new Server(server, {
  path:'/eden',
  addTrailingSlash:false
});

app.get('/', (req, res) => {
  const result = `result: ${req.protocol}://${req.get('host')}${req.originalUrl}`;
  console.log(result);
  res.send(result);
})

io.on('connection', (socket) => {
  socket.on('message', (msg) => {
    console.log('Message: ' + msg);
  });
  socket.on('binary_data', (msg) => {
    console.log('Message: ' + msg.toString());
  });
  console.log('a user connected');
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})