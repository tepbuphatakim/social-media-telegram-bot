import bot from './bot.js';
import { saveUser } from '../services/user.js';

bot.start(async (ctx) => {
  const { id, ...from } = ctx.message.from;
  await saveUser({
    ...from,
    id_telegram: id,
  });
  ctx.reply('Bot start');
  ctx.scene.enter('feed-scene');
});
