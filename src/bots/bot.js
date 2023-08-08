import { Telegraf } from 'telegraf';

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.launch();

export default bot;
