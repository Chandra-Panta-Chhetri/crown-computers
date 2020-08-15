const express = require("express");
const app = express();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const compression = require("compression");
const enforce = require("express-sslify");
const path = require("path");

app.use(enforce.HTTPS({ trustProtoHeader: true }));
app.use(compression());
app.use(express.json());

app.post("/checkout", async (req, res) => {
  try {
    const { id: source, amount } = req.body;
    const currency = "cad";
    const stripeRes = await stripe.charges.create({ source, amount, currency });
    res.status(200).send({ success: "Payment processed", stripeRes });
  } catch (e) {
    res.status(400).send({ msg: e.message });
  }
});

app.get("/service-worker.js", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/service-worker.js"));
});

module.exports = app;
