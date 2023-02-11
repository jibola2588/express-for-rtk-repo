const express = require("express");
const Stripe = require("stripe");

require('dotenv').config()

const stripe = Stripe(process.env.STRIPE_KEY)

console.log(`stripe_key is ${process.env.STRIPE_KEY}`)

const router = express.Router()

router.post("/create-checkout-session", async (req,res) => {

  const line_items = req.body.cartItems.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.image],
          description: item.desc,
          metadata: {
            id: item.id,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.cartQuantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
   line_items, 
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/checkout-sucess`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });

  console.log(`url is ${session.url}`)
  res.send({url:session.url});
});

console.log(router)

  module.exports = router;