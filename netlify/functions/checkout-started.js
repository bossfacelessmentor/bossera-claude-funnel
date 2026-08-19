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

  const apiKey = process.env.SENDER_API_KEY;
  if (!apiKey) {
    console.error('[checkout-started] SENDER_API_KEY missing');
    return { statusCode: 500, headers: corsHeaders, body: JSON.stringify({ error: 'Sender not configured' }) };
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

  // Route to correct group based on source
  let groupId;
  if (source === 'luxe') {
    groupId = process.env.SENDER_GROUP_LUXE_CHECKOUT_STARTED;
  } else {
    // Default to AI for 'ai' or any unrecognised source
    groupId = process.env.SENDER_GROUP_AI_CHECKOUT_STARTED;
  }

  if (!groupId) {
    console.error('[checkout-started] group env var missing for source:', source);
    return { statusCode: 500, headers: corsHeaders, body: JSON.stringify({ error: 'Group not configured' }) };
  }

  console.log('[checkout-started] email:', email, 'source:', source, 'group:', groupId);

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
    console.log('[checkout-started] Sender status:', res.status);

    if (!res.ok) {
      console.error('[checkout-started] Sender error:', JSON.stringify(data));
      return { statusCode: 500, headers: corsHeaders, body: JSON.stringify({ error: 'Sender error', details: data }) };
    }

    return { statusCode: 200, headers: corsHeaders, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error('[checkout-started] fetch error:', err.message);
    return { statusCode: 500, headers: corsHeaders, body: JSON.stringify({ error: err.message }) };
  }
};
