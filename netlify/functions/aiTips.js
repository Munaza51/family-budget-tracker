// .netlify/functions/aiTips.js
import fetch from "node-fetch"; // یا فقط fetch اگر Node >=18 داری

export const handler = async function(event, context) {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
    }

    const { summary } = JSON.parse(event.body || "{}");

    if (!summary) return { statusCode: 400, body: JSON.stringify({ error: "Missing summary" }) };

    const API_KEY = process.env.OPENROUTER_KEY;
    if (!API_KEY) throw new Error("Missing API key");

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${API_KEY}` },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are an AI financial advisor." },
          { role: "user", content: `Here is a summary of my spending: ${summary}` },
        ],
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      return { statusCode: 500, body: JSON.stringify({ error: err }) };
    }

    const data = await res.json();
    const tips = data.choices?.[0]?.message?.content?.trim() || "No tips";

    return { statusCode: 200, body: JSON.stringify({ tips }) };

  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
