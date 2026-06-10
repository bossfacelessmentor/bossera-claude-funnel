import Stripe from 'stripe';

export const handler = async (event) => {
  console.log('create-payment-intent:', process.env.STRIPE_SECRET_KEY ? 'Key found' : 'Key missing');

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
      amount: 2700,
      currency: 'usd',
      payment_method_types: ['card'],
      description: 'AI Content to Cash System',
      receipt_email: email || undefined,
      metadata: {
        product: 'AI Content to Cash System',
        email: email || '',
      },
    });

    console.log('[PI] id:', paymentIntent.id);
    console.log('[PI] status:', paymentIntent.status);
    console.log('[PI] client_secret present:', !!paymentIntent.client_secret);
    console.log('[PI] client_secret prefix:', paymentIntent.client_secret ? paymentIntent.client_secret.substring(0, 25) + '...' : 'MISSING');
    console.log('[PI] livemode:', paymentIntent.livemode);

    const responseBody = { clientSecret: paymentIntent.client_secret };
    console.log('[PI] returning to frontend — clientSecret present:', !!responseBody.clientSecret);

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify(responseBody),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
