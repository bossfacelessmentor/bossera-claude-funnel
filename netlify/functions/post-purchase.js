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
    console.error('[post-purchase] SENDER_API_KEY missing');
    return { statusCode: 500, headers: corsHeaders, body: JSON.stringify({ error: 'Sender not configured' }) };
  }

  let email, payment_intent_id, source;
  try {
    ({ email, payment_intent_id, source } = JSON.parse(event.body || '{}'));
  } catch {
    return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'Invalid request body' }) };
  }

  if (!email) {
    return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'Email required' }) };
  }

  // Route to correct buyer group based on source
  let groupId;
  if (source === 'luxe') {
    groupId = process.env.SENDER_GROUP_LUXE_BUYER;
  } else {
    // Default to AI for 'ai' or any unrecognised source
    groupId = process.env.SENDER_GROUP_AI_BUYER;
  }

  if (!groupId) {
    console.error('[post-purchase] group env var missing for source:', source);
    return { statusCode: 500, headers: corsHeaders, body: JSON.stringify({ error: 'Group not configured' }) };
  }

  console.log('[post-purchase] email:', email, 'source:', source, 'group:', groupId, 'pi:', payment_intent_id);

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
    console.log('[post-purchase] Sender status:', res.status);

    if (!res.ok) {
      console.error('[post-purchase] Sender error:', JSON.stringify(data));
      return { statusCode: 500, headers: corsHeaders, body: JSON.stringify({ error: 'Sender error', details: data }) };
    }

    return { statusCode: 200, headers: corsHeaders, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error('[post-purchase] fetch error:', err.message);
    return { statusCode: 500, headers: corsHeaders, body: JSON.stringify({ error: err.message }) };
  }
};
