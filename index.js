const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const requestIp = require("request-ip");
var net = require('net');

// app.use(requestIp.mw());
app.use(requestIp.mw({ attributeName: "myCustomAttributeName" }));

app.use("/ip", function (req, res) {
  const ip = req.clientIp;
  const port = req.clientPort;
  //   res.send(ip+' '+req.connection.remotePort);
  res.send(
    req.connection.remoteAddress +
      " " +
      req.connection.remotePort +
      " " +
      req.connection.localAddress +
      " " +
      req.connection.localPort
  );
});

app.use("/ip2", function (req, res) {
  // use our custom attributeName that we registered in the middleware
  var ip = req.myCustomAttributeName;
  console.log(ip);

  // https://nodejs.org/api/net.html#net_net_isip_input
  var ipType = net.isIP(ip); // returns 0 for invalid, 4 for IPv4, and 6 for IPv6
  res.end(
    "Hello, your ip address is " + ip + " and is of type IPv" + ipType + "\n"
  );
});

app.get("/", (req, res) => {
  res.json({ result: "ok", data: [1, 2, 3, 4, 5] });
});

app.get("/api", (req, res) => {
  res.send("mook");
});

app.listen(PORT, () => {
  console.log(`Serer is running. ${PORT}`);
});
