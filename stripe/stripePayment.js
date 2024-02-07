const stripe = require("./stripeConfig.js")

const createPaymentIntent = async () => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 1000,
            currency: 'USD',
            description: 'One-to-one payment',
        });
        return { success: true, paymentIntent };
    } catch (error) {
        console.error('Payment failed:', error.message);
        return { success: false, error: error.message };
    }
}
module.exports = { createPaymentIntent };
// payment in tntent is not necessary 
// checkout session done 

// index.htmnl
// < !DOCTYPE html >
//     <html lang="en">
//         <head>
//             <meta charset="UTF-8">
//                 <meta name="viewport" content="width=device-width, initial-scale=1.0">
//                     <title>Stripe Payment Demo</title>
//                 </head>
//                 <body>
//                     <button id="checkout-button">Checkout</button>

//                     <script src="https://js.stripe.com/v3/"></script>
//                     <script src="client.js"></script>
//                 </body>
//             </html>
// 
// js file 
// document.getElementById('checkout-button').addEventListener('click', async () => {
//     const response = await fetch('http://localhost:3000/create-checkout-session', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     });

//     const session = await response.json();

//     const stripe = Stripe('your-publishable-key');
//     const result = await stripe.redirectToCheckout({
//         sessionId: session.id,
//     });

//     if (result.error) {
//         console.error('Error redirecting to Checkout:', result.error);
//     }
// });


// post in th http://localhost:3000/create-checkout-session
