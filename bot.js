const TelegramBot = require('node-telegram-bot-api');
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
  if (msg.web_app_data) {
    const data = JSON.parse(msg.web_app_data.data);
    bot.sendMessage('@owner', `
🔗 Emoji: ${data.emoji_link}
📝 Catatan: ${data.customer_text}
🎨 Warna: ${data.color_code}
    `);
  }
});
