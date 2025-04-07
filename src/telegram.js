import axios from 'axios';
import { getGeminiResponse } from './gemini.js';

const telegramApi = `https://api.telegram.org/bot${process.env.BOT_TOKEN}`;

export default async function handleTelegramMessage(req, res) {
  const message = req.body.message;

  if (!message || !message.text) {
    return res.sendStatus(200); // Skip non-text messages
  }

  const chatId = message.chat.id;
  const userText = message.text.trim();

  // Handle basic commands
  if (userText === '/start') {
    await sendMessage(chatId, '👋 Hi! I\'m your AI assistant powered by Gemini. Ask me anything!');
    return res.sendStatus(200);
  }

  if (userText === '/help') {
    await sendMessage(chatId, '💡 Just send a message and I\'ll reply using Gemini AI!');
    return res.sendStatus(200);
  }

  if (userText === '/reset') {
    await sendMessage(chatId, '🔄 No history is stored. Just keep chatting!');
    return res.sendStatus(200);
  }

  // Generate Gemini response
  const aiReply = await getGeminiResponse(userText);
  
  // Send the response to Telegram, ensuring proper formatting
  await sendMessage(chatId, aiReply);

  res.sendStatus(200);
}

async function sendMessage(chatId, text) {
  try {
    // Escape special Markdown characters if using Markdown formatting
    const formattedText = escapeMarkdown(text);

    // Send the message to Telegram with the desired parse mode
    await axios.post(`${telegramApi}/sendMessage`, {
      chat_id: chatId,
      text: formattedText,
      parse_mode: 'MarkdownV2',  // or use 'None' to disable Markdown formatting
    });
  } catch (err) {
    console.error('❌ Telegram sendMessage error:', err.message);
  }
}

// Function to escape special Markdown characters
function escapeMarkdown(text) {
  return text.replace(/([*_[\]()~`>#+-=|{}.!])/g, '\\$1'); // Escape special Markdown characters
}
