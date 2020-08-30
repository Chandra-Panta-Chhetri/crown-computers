const express = require("express");
const app = express();
const compression = require("compression");
const enforce = require("express-sslify");
const path = require("path");
const paymentRoutes = require("./routes/api/payments");

// app.use(enforce.HTTPS({ trustProtoHeader: true }));
app.use(compression());
app.use(express.json());
app.use("/api/payments", paymentRoutes);

app.get("/service-worker.js", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/service-worker.js"));
});

module.exports = app;
