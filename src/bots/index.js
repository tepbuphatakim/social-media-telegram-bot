import { Telegraf, Markup } from 'telegraf';
import { saveUser } from '../services/user.js';

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start(async (ctx) => {
  await saveUser({
    ...ctx.update.message.from,
    id_telegram: ctx.update.message.from.id,
  });
  ctx.reply('Bot start');
});

bot.command('test', async (ctx) => {
  try {
    console.log(ctx.update.message.from);
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
