const OpenAI = require("openai");
const express = require("express");

// can you add body parser and cors to this file?
const bodyParser = require("body-parser");
const cors = require("cors");

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY, // Retrieve API key from .env file
  // Always create new token from this category (Personal access tokens (classic))
  // Retrieve API key from .env file
  baseURL: "https://models.inference.ai.azure.com",
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 3080;

app.post("/", async (req, res) => {
  const { message } = req.body;
  console.log("Received message:", message);
  try {
    const response = await openai.chat.completions.create({
      messages: [{ role: "user", content: message }],
      model: "gpt-4o",
      temperature: 1,
      max_tokens: 4096,
      top_p: 1,
    });

    console.log("AI Response:", response.choices[0]);

    res.json({
      message: response.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch response from OpenAI" });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
