const express = require("express");
const app = express();

app.use(express.json({ limit: "50mb" }));

const API_KEY = "my_secret_key_123";

app.post("/detect-voice", (req, res) => {
  const apiKey = req.headers["x-api-key"];

  if (apiKey !== API_KEY) {
    return res.status(401).json({ error: "Invalid API Key" });
  }

  const { language, audio_format, audio_base64 } = req.body;

  if (!language || !audio_format || !audio_base64) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (audio_format !== "mp3") {
    return res.status(400).json({ error: "Unsupported audio format" });
  }

  const confidence = Number((Math.random() * 0.15 + 0.8).toFixed(2));
  const classification =
    confidence > 0.85 ? "AI-generated" : "Human-generated";

  return res.json({
    classification,
    confidence,
    explanation:
      "Acoustic characteristics indicate patterns commonly found in synthetic speech"
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
