const axios = require("axios");

const sendMessage = async (chatId, text) => {
  const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
  await axios.post(url, {
    chat_id: chatId,
    text: text
  });
};

module.exports = { sendMessage };
