const stripe = require("./stripeConfig.js")

const DOMAIN = 'http://192.168.1.73:2000';
const data = require("../db/models/payment.js");
const { RES, STATUS } = require("../common/common.js");
const Checkout = async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: 'price_1OaGDpEtnmfQtWQ6UWGghAxZ',
                    quantity: 1,
                },
            ],
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: `https://stripe.com/docs/payments/payment-intents`,
            cancel_url: `${DOMAIN}?canceled=true`,
        });

        console.log(session, "in session ")
        console.log(DOMAIN, "in domain url ")
        console.log(session.currency, " in currency ")
        const sessionId = session.id;
        console.log(sessionId, "here in session id ")
        console.log('Payment Intent ID:', session.payment_intent);

        // Pass session data to gettingData function
        await gettingData({
            res,
            currencyType: session.currency,
            amountSubtotal: session.amount_total,
            paymentMode: session.payment_method_types
        });

        return res.render("checkout", { sessionUrl: session.url });
    } catch (error) {
        console.error('Error creating Checkout Session:', error.message);
        return res.status(500).send('Internal Server Error');
    }
}

const gettingData = async ({ res, currencyType, amountSubtotal, paymentMode }) => {
    try {
        const gotdata = await data.create({
            currencyType,
            amountSubtotal,
            paymentMode,
        });

        console.log(currencyType, "in currency Type")
        console.log(amountSubtotal, "amount")
        console.log(paymentMode, "payment")


        return res.status(200).send('Data stored successfully');
    } catch (error) {
        console.log(error);

        return res.status(500).send('Internal Server Error');
    }
}

module.exports = { Checkout, gettingData }

// 







//  in checkout session will have session  id 
// and redirect to checkout page with have session id 
// / on checkout page user complete the payment 
// and then stripe handle the payment 




// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
// const stripe = require('stripe')('sk_test_tR3PYbcVNZZ796tH88S4VQ2u');
// const express = require('express');
// const app = express();
// app.use(express.static('public'));


// 
// ///////////////////////////// //


// const stripe = require("./stripeConfig.js")

// const DOMAIN = 'http://192.168.1.73:2000';
// const data = require("../db/models/payment.js");
// const { RES, STATUS } = require("../common/common.js");

