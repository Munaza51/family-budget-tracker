import fetch from "node-fetch";

export const handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const { summary } = JSON.parse(event.body || "{}");
    if (!summary) return { statusCode: 400, body: "Missing summary" };

    const API_KEY = process.env.OPENROUTER_KEY;
    if (!API_KEY) throw new Error("Missing API key");

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a friendly AI financial advisor." },
          { role: "user", content: `Summary: ${summary}. Give 2-3 short tips.` },
        ],
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      return { statusCode: 500, body: err };
    }

    const data = await res.json();
    const tips = data.choices?.[0]?.message?.content || "No tips generated.";

    return { statusCode: 200, body: JSON.stringify({ tips }) };
  } catch (err) {
    return { statusCode: 500, body: err.message };
  }
};
