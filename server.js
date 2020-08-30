const app = require("./app");
const express = require("express");
const path = require("path");
const compression = require("compression");
const enforce = require("express-sslify");

if (process.env.NODE_ENV === "production") {
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
  app.use(express.static("client/build"));
  app.use(compression());

  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "client/build/index.html"))
  );

  app.get("/service-worker.js", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/service-worker.js"));
  });
}

app.listen(process.env.PORT, () =>
  console.log(`Server Online on PORT ${process.env.PORT}`)
);
