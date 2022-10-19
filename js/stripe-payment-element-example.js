
'use strict';

/*
  For more examples see https://github.com/stripe-samples/accept-a-payment/tree/main/payment-element
*/

var stripePk = 'pk_test_1iMhjY7f5CoIcsNSBiu2xVCS57L28F5sz9JtZrl3hbpY1V70hOngn2qBq21YECVHpo1z6YAR6lBPGCHBkCitEj1wT00S8h3VRdE';
var stripeAccountId = 'acct_1L1ZTf2m38C1z0Zu';

const stripe = Stripe(stripePk, {stripeAccount: stripeAccountId});
const options = {
  clientSecret: 'pi_3LcqZb2m38C1z0Zu0fKh2knh_secret_VtVIao4uEQ4FlJ4aTnqOxc5b1',
  appearance: {theme: 'stripe'},
};

// Set up Stripe.js and Elements to use in checkout form, passing the client secret obtained in step 2
const elements = stripe.elements(options);

// Create and mount the Payment Element
const paymentElement = elements.create('payment');
paymentElement.mount('#payment-element');

const form = document.getElementById('payment-form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const {error} = await stripe.confirmPayment({
    //`Elements` instance that was used to create the Payment Element
    elements,
    confirmParams: {
      return_url: 'https://eouguo7zpmtqyzk.m.pipedream.net',
    },
  });

  if (error) {
    // This point will only be reached if there is an immediate error when
    // confirming the payment. Show error to your customer (for example, payment
    // details incomplete)
    const messageContainer = document.querySelector('#error-message');
    messageContainer.textContent = error.message;
  } else {
    // Your customer will be redirected to your `return_url`. For some payment
    // methods like iDEAL, your customer will be redirected to an intermediate
    // site first to authorize the payment, then redirected to the `return_url`.
  }
});

