const express = require("express");
const app = express();
const paymentRoutes = require("./routes/api/payments");

app.use(express.json());
app.use("/api/payments", paymentRoutes);

module.exports = app;
