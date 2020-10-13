var socket = io.connect("192.168.126.128:3000");

var gaugeElements = document.getElementsByTagName("canvas");

document.addEventListener("DOMContentLoaded", (e) => {
  socket.on("carMessage", (data) => {
    gaugeElements[0].setAttribute("data-value", data.speed);
    gaugeElements[1].setAttribute("data-value", data.revs);
  });
});
