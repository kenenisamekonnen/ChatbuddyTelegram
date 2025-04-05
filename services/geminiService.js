const axios = require("axios");

const generateReply = async (prompt) => {
  try {
    const res = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
      {
        contents: [{ parts: [{ text: prompt }] }]
      },
      {
        params: { key: process.env.GEMINI_API_KEY }
      }
    );
    return res.data.candidates[0]?.content.parts[0].text || "No reply.";
  } catch (err) {
    console.error("Gemini error:", err.message);
    return "Sorry, I couldn't process that.";
  }
};

module.exports = { generateReply };
