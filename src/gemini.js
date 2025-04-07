import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getGeminiResponse(userInput) {
  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: String(userInput).trim(), // Ensure input is a string and trimmed
    });

    const responseText = result.text; // Access the text property of the result
    return responseText || "⚠️ I couldn't generate a response.";
  } catch (error) {
    console.error("❌ Gemini error:", error.message);
    return "⚠️ Sorry, something went wrong with Gemini.";
  }
}
