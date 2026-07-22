export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  const { name, email } = JSON.parse(event.body);
  if (!email) {
    return { statusCode: 400, body: JSON.stringify({ error: "Email is required" }) };
  }

  const API_KEY = process.env.MAILERLITE_API_KEY;
  if (!API_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: "Server misconfigured" }) };
  }

  const GROUP_ID = "188462618270238382";

  const res = await fetch(`https://connect.mailerlite.com/api/subscribers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      email,
      fields: { name: name || "" },
      groups: [GROUP_ID],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    return { statusCode: res.status, body: err };
  }

  return { statusCode: 200, body: JSON.stringify({ ok: true }) };
}
