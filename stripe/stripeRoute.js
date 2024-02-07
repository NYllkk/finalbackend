const express = require("express")
const router = express.Router()
const { createPaymentIntent } = require("./stripePayment.js")
const { Checkout, gettingData } = require("./stripeCheckout.js")
router.post("/pay", createPaymentIntent)
// payment intent is not necessary during checkout 
router.get("/data", gettingData)

router.post("/create-checkout-session", Checkout)
module.exports = router
// routefile
// 


// app.post('/webhook', async (req, res) => {
//     const payload = req.body;
//     const sig = req.headers['stripe-signature'];

//     let event;

//     try {
//         event = stripe.webhooks.constructEvent(payload, sig, 'your-webhook-secret');
//     } catch (err) {
//         return res.status(400).send(`Webhook Error: ${err.message}`);
//     }

//     // Handle the event
//     switch (event.type) {
//         case 'checkout.session.completed':
//             const session = event.data.object;
//             // Retrieve additional information from the session and update your database
//             break;
//         // Handle other events as needed
//         default:
//             console.log(`Unhandled event type: ${event.type}`);
//     }

//     res.json({ received: true });
// });

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });


// 
// case 'checkout.session.completed':
// const session = event.data.object;
// const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);

// // Access line items and product details
// const lineItems = paymentIntent.charges.data[0].billing_details.address.line1;
// const productName = lineItems[0].description;
// const productPrice = lineItems[0].amount / 100; // Convert amount to currency

// // Update your database with the retrieved information
// break;



// 
// case 'checkout.session.completed':
// // Process and update your database with additional information
// // ...

// // Redirect to success page
// return res.redirect(303, 'http://your-website.com/success-page');
