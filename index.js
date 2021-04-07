const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const requestIp = require("request-ip");

app.use(requestIp.mw());

app.use("/ip", function (req, res) {
  const ip = req.clientIp;
  res.end(ip);
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
