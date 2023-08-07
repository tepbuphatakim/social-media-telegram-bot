import { Telegraf, Markup } from 'telegraf';
import { create } from '../services/todo.js';

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  let message = ` Please use the /fact command to receive a new fact`;
  ctx.reply(message);
});

bot.command('test', async (ctx) => {
  try {
    await create();
    ctx.reply('Generating image, Please wait !!!');
  } catch (error) {
    console.error('error', error);
  }
});

bot.command('custom', async (ctx) => {
  return ctx.reply(
    'Custom buttons keyboard',
    Markup.keyboard([
      ['🔍 Search', '😎 Popular'], // Row1 with 2 buttons
      ['☸ Setting', '📞 Feedback'], // Row2 with 2 buttons
      ['📢 Ads', '⭐️ Rate us', '👥 Share'], // Row3 with 3 buttons
    ])
      .oneTime()
      .resize()
  );
});

bot.launch();
