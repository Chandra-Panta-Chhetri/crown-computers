const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("", async (req, res) => {
  try {
    const { amount, receipt_email } = req.body;
    if (!isPositiveNumber(amount)) throw Error();
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "cad",
      receipt_email
    });
    res.status(200).json(paymentIntent.client_secret);
  } catch (err) {
    res.status(400).json({
      msg:
        "Something went wrong while processing your payment. Please try again."
    });
  }
});

const isPositiveNumber = (num) => num > 0;

module.exports = router;
