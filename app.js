require("dotenv").config();
const express = require("express");
// const connectDB = require("./config/db");
const webhookRoute = require("./routes/webhook");
const axios = require("axios");

const app = express();
app.use(express.json());

// connectDB();
app.use("/webhook", webhookRoute);

// Set the webhook dynamically using ngrok
const setTelegramWebhook = async () => {
  const webhookUrl = `https://abcd1234.ngrok.io/webhook`;  // Replace this with your actual ngrok URL

  try {
    const response = await axios.get(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/setWebhook`, {
      params: { url: webhookUrl }
    });
    console.log("Webhook set successfully:", response.data);
  } catch (error) {
    console.error("Error setting webhook:", error.message);
  }
};

// Call the function when the app starts
setTelegramWebhook();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
