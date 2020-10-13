var can = require("socketcan");
var express = require("express");
var app = express();
var port = 3000;

// Create the Server
var server = require("http").createServer(app);
var io = require("socket.io")(server);

app.use(express.static(__dirname + "/client"));
app.use(
  "/scripts",
  express.static(__dirname + "/client/node_modules/canvas-gauges/")
);

// Create the channel for listening to the CAN data
var channel = can.createRawChannel("vcan0", true);

// channel.setRxFilters([
//   {
//     id: 201,
//     mask: 201,
//   },
//   {
//     id: 517,
//     mask: 517,
//   },
// ]);

var carInfo = {
  speed: 0,
  revs: 0,
};

channel.addListener("onMessage", (msg) => {
  if (msg.id === msg.id)
    carInfo = {
      speed: msg.data.readUIntBE(4, 2),
      revs: msg.data.readUIntBE(0, 4),
    };
  console.log(carInfo);
});

io.on("connection", () => {
  console.log("Socket connection extablished.");
});

setInterval(() => {
  io.emit("carMessage", carInfo);
}, 100);

// Start the channel
channel.start();

// Start the server
server.listen(port, () => console.log(`App listening on port ${port}`));
