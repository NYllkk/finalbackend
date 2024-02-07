var stripe = Stripe('pk_test_51OKZAzSBbrWp9KWdcW5uh5RghYJC1isC3TA1rUeRpGPGzK2CCQx62PHoesZEXjrFzB3JMS8lGuh7HRi2UwQWlgYG00gKaPL3FO');

document.getElementById('payButton').addEventListener('click', async function () {
    console.log("buton CLicked ")
    const { paymentIntent, error } = await createPaymentIntent();
    if (error) {
        console.error('Payment failed:', error);
        return;
    }
    const result = await stripe
        .confirmCardPayment(paymentIntent.client_secret, {
            payment_method: {
                card: stripe.elements.getElement('card'),
            },
        });
    if (result.error) {
        console.error('Payment confirmation failed:', result.error);
    } else {
        console.log('Payment confirmed successfully:', result.paymentIntent);
    }
});

async function createPaymentIntent() {
    const response = await fetch('/api/pay/payment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.json();
}
