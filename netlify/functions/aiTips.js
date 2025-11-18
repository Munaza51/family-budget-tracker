const fetch = require("node-fetch"); // If Netlify uses Node <18

exports.handler = async function (event, context) {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Method not allowed" }),
      };
    }

    const { summary } = JSON.parse(event.body || "{}");

    if (!summary) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing summary in request body" }),
      };
    }

    const API_KEY = process.env.OPENROUTER_KEY;
    if (!API_KEY) throw new Error("Missing API key");

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "You are an AI financial advisor who gives short, practical budget-saving tips based on user's expenses.",
            },
            {
              role: "user",
              content: `Here is a summary of my spending: ${summary}. Give 2–3 short, simple tips.`,
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      return { statusCode: 500, body: JSON.stringify({ error: err }) };
    }

    const data = await response.json();
    const tips =
      data.choices?.[0]?.message?.content?.trim() || "No tips generated.";

    return {
      statusCode: 200,
      body: JSON.stringify({ tips }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
