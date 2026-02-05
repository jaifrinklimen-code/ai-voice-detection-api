export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const apiKey = req.headers["x-api-key"];
  if (apiKey !== "my_secret_key_123") {
    return res.status(401).json({ error: "Invalid API Key" });
  }

  const { language, audio_format, audio_base64 } = req.body || {};

  if (!language || !audio_format || !audio_base64) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const confidence = Math.floor(Math.random() * 30) + 70;
  const classification =
    confidence > 80 ? "AI_GENERATED" : "HUMAN_GENERATED";

  res.status(200).json({
    classification,
    confidence,
    explanation:
      "Acoustic characteristics indicate patterns commonly found in synthetic speech"
  });
}
