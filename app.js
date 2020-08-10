const express = require("express");
const app = express();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const compression = require("compression");

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

module.exports = app;
