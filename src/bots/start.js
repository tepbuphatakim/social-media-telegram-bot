import bot from './bot.js';
import { Markup } from 'telegraf';
import { saveUser } from '../services/user.js';

bot.start(async (ctx) => {
  const { id, ...from } = ctx.message.from;
  await saveUser({
    ...from,
    id_telegram: id,
  });
  ctx.reply('Bot start');
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

bot.command('test', async (ctx) => {
  try {
    console.log(ctx.message.from);
    ctx.reply('Generating image, Please wait !!!');
  } catch (error) {
    console.error('error', error);
  }
});
