export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  const { name, email } = JSON.parse(event.body);
  if (!email) {
    return { statusCode: 400, body: JSON.stringify({ error: "Email is required" }) };
  }

  const apiKey = process.env.SENDER_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, body: JSON.stringify({ error: "Server misconfigured" }) };
  }

  const groupId = process.env.SENDER_GROUP_AIMUSE_FREE_GUIDE;
  if (!groupId) {
    console.error('[subscribe] SENDER_GROUP_AIMUSE_FREE_GUIDE missing');
    return { statusCode: 500, body: JSON.stringify({ error: "Group not configured" }) };
  }

  const res = await fetch('https://api.sender.net/v2/subscribers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      email,
      firstname: name || undefined,
      groups: [groupId],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error('[subscribe] Sender error:', err);
    return { statusCode: res.status, body: err };
  }

  return { statusCode: 200, body: JSON.stringify({ ok: true }) };
}
