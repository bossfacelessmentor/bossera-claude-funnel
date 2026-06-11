export const handler = async (event) => {
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

  const apiKey = process.env.MAILERLITE_API_KEY;
  if (!apiKey) {
    console.log('[checkout-started] MAILERLITE_API_KEY missing');
    return { statusCode: 500, headers: corsHeaders, body: JSON.stringify({ error: 'MailerLite not configured' }) };
  }

  let email, source;
  try {
    ({ email, source } = JSON.parse(event.body || '{}'));
  } catch {
    return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'Invalid request body' }) };
  }

  if (!email) {
    return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'Email required' }) };
  }

  console.log('[checkout-started] email:', email, 'source:', source);

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
        groups: ['189968569624167460'],
      }),
    });

    const data = await res.json();
    console.log('[checkout-started] MailerLite status:', res.status);

    if (!res.ok) {
      console.error('[checkout-started] MailerLite error:', JSON.stringify(data));
      return { statusCode: 500, headers: corsHeaders, body: JSON.stringify({ error: 'MailerLite error', details: data }) };
    }

    console.log('[checkout-started] subscriber added, id:', data.data?.id);
    return { statusCode: 200, headers: corsHeaders, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error('[checkout-started] fetch error:', err.message);
    return { statusCode: 500, headers: corsHeaders, body: JSON.stringify({ error: err.message }) };
  }
};
