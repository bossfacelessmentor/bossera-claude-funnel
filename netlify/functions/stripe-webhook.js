import Stripe from 'stripe';

// Stripe metadata.product values set at payment intent creation
const PRODUCT_AI = 'AI Content to Cash System';
const PRODUCT_LUXE = 'The Luxe Editorial Vault - Founding Access';

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
    console.log('[stripe-webhook] No email on payment_intent:', paymentIntent.id);
    return { statusCode: 200, body: JSON.stringify({ received: true, skipped: 'no email' }) };
  }

  const apiKey = process.env.SENDER_API_KEY;
  if (!apiKey) {
    console.error('[stripe-webhook] SENDER_API_KEY missing');
    return { statusCode: 500, body: JSON.stringify({ error: 'Sender not configured' }) };
  }

  // Route to correct buyer group based on product metadata
  const product = paymentIntent.metadata?.product || '';
  let groupId;
  if (product === PRODUCT_LUXE) {
    groupId = process.env.SENDER_GROUP_LUXE_BUYER;
  } else if (product === PRODUCT_AI) {
    groupId = process.env.SENDER_GROUP_AI_BUYER;
  } else {
    // Unknown product — default to AI buyer and log warning
    console.warn('[stripe-webhook] Unknown product metadata:', product, '— defaulting to AI buyer group');
    groupId = process.env.SENDER_GROUP_AI_BUYER;
  }

  if (!groupId) {
    console.error('[stripe-webhook] Buyer group env var missing for product:', product);
    return { statusCode: 500, body: JSON.stringify({ error: 'Group not configured' }) };
  }

  console.log('[stripe-webhook] pi:', paymentIntent.id, 'email:', email, 'product:', product, 'group:', groupId);

  try {
    const res = await fetch('https://api.sender.net/v2/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email,
        groups: [groupId],
      }),
    });

    const data = await res.json();
    console.log('[stripe-webhook] Sender status:', res.status);

    if (!res.ok) {
      console.error('[stripe-webhook] Sender error:', JSON.stringify(data));
      return { statusCode: 500, body: JSON.stringify({ error: 'Sender error', details: data }) };
    }

    return { statusCode: 200, body: JSON.stringify({ received: true }) };
  } catch (err) {
    console.error('[stripe-webhook] fetch error:', err.message);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
