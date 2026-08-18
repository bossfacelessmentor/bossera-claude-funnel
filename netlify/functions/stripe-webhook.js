import Stripe from 'stripe';

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const sig = event.headers['stripe-signature'];

  let stripeEvent;
  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('[stripe-webhook] Signature verification failed:', err.message);
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid signature' }) };
  }

  if (stripeEvent.type !== 'payment_intent.succeeded') {
    return { statusCode: 200, body: JSON.stringify({ received: true }) };
  }

  const paymentIntent = stripeEvent.data.object;
  const email = paymentIntent.receipt_email || paymentIntent.metadata?.email;

  if (!email) {
    console.log('[stripe-webhook] No email found on payment_intent:', paymentIntent.id);
    return { statusCode: 200, body: JSON.stringify({ received: true, skipped: 'no email' }) };
  }

  const apiKey = process.env.MAILERLITE_API_KEY;
  if (!apiKey) {
    console.error('[stripe-webhook] MAILERLITE_API_KEY missing');
    return { statusCode: 500, body: JSON.stringify({ error: 'MailerLite not configured' }) };
  }

  try {
    const res = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        email,
        groups: ['188462618270238382'],
      }),
    });

    const data = await res.json();
    console.log('[stripe-webhook] payment_intent:', paymentIntent.id, 'email:', email, 'MailerLite status:', res.status);

    if (!res.ok) {
      console.error('[stripe-webhook] MailerLite error:', JSON.stringify(data));
      return { statusCode: 500, body: JSON.stringify({ error: 'MailerLite error', details: data }) };
    }

    return { statusCode: 200, body: JSON.stringify({ received: true, subscriber: data.data?.id }) };
  } catch (err) {
    console.error('[stripe-webhook] fetch error:', err.message);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
