const { generateReply } = require("../services/geminiService");
const { sendMessage } = require("../services/telegramService");
// const Chat = require("../models/Chat");

const handleTelegramMessage = async (req, res) => {
  const message = req.body.message;
  const chatId = message.chat.id;
  const text = message.text;

  const reply = await generateReply(text);

  await sendMessage(chatId, reply);

  await Chat.create({
    userId: chatId,
    message: text,
    response: reply
  });

  res.sendStatus(200);
};

module.exports = { handleTelegramMessage };
