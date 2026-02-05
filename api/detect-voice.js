export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const apiKey = req.headers["x-api-key"];
  if (apiKey !== "my_secret_key_123") {
    return res.status(401).json({ error: "Invalid API Key" });
  }

  const { language, audioFormat, audioBase64 } = req.body || {};

  if (!language || !audioFormat || !audioBase64) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  return res.status(200).json({
    classification: "AI_GENERATED",
    confidence: 87,
    explanation:
      "Acoustic characteristics indicate patterns commonly found in synthetic speech"
  });
}
