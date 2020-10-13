var can = require("socketcan");

var channel = can.createRawChannel("vcan0", true);

var msg = {
  id: 500,
  data: [0, 0, 0, 0, 0, 0, 0, 0],
};

var speed = 0;
var revs = 0;

var up = true;

var out = {};

var buffer;

setInterval(() => {
  buffer = Buffer.alloc(8);
  if (speed < 155) {
    speed++;
    revs += 240;
  } else {
    if (up) {
      revs += 100;
      up = false;
    } else {
      revs -= 100;
      up = true;
    }
  }
  buffer.writeUIntBE(revs, 0, 4);
  buffer.writeUIntBE(speed, 4, 2);

  console.log(buffer);

  if (revs > 7000) revs = 1000;

  out = {
    id: msg.id,
    data: buffer,
  };

  channel.send(out);
}, 100);

channel.start();
