import Stripe from 'stripe';

export const handler = async (event) => {
  console.log('create-payment-intent-luxe:', process.env.STRIPE_SECRET_KEY ? 'Key found' : 'Key missing');

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: corsHeaders, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return { statusCode: 500, headers: corsHeaders, body: JSON.stringify({ error: 'Stripe not configured' }) };
  }

  try {
    const { email } = JSON.parse(event.body || '{}');
    const stripe = new Stripe(secretKey);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 9700,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
      description: 'The Luxe Editorial Vault - Founding Access',
      receipt_email: email || undefined,
      metadata: {
        product: 'The Luxe Editorial Vault - Founding Access',
        email: email || '',
      },
    });

    console.log('[Luxe PI] id:', paymentIntent.id);
    console.log('[Luxe PI] status:', paymentIntent.status);
    console.log('[Luxe PI] client_secret present:', !!paymentIntent.client_secret);
    console.log('[Luxe PI] livemode:', paymentIntent.livemode);

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
