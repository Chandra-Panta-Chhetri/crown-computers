const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("", async (req, res) => {
  try {
    const { amount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "cad"
    });
    console.log(paymentIntent, amount);
    res.status(200).json(paymentIntent.client_secret);
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ msg: e.message });
  }
});

module.exports = router;
