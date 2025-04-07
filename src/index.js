import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import axios from 'axios';
import handleTelegramMessage from './telegram.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL; // your ngrok or deployed HTTPS url
const BOT_TOKEN = process.env.BOT_TOKEN;

app.use(bodyParser.json());

// Health check
app.get('/', (req, res) => {
  res.send('🤖 Telegram Gemini Bot is running!');
});

// Telegram webhook endpoint
app.post('/webhook', handleTelegramMessage);

// ✅ Automatically set webhook when server starts
async function setWebhook() {
  try {
    const webhookUrl = `${BASE_URL}/webhook`;
    const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/setWebhook`;

    const response = await axios.post(telegramUrl, {
      url: webhookUrl,
    });

    console.log('✅ Webhook set successfully:', response.data);
  } catch (err) {
    console.error('❌ Failed to set webhook:', err.message);
  }
}

app.listen(PORT, async () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  await setWebhook(); // call webhook setup after server starts
});
