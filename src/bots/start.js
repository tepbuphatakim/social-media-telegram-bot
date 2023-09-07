import bot from './bot.js';
import { saveUser } from '../services/user.js';

bot.start(async (ctx) => {
  const { id, ...from } = ctx.message.from;
  await saveUser({
    ...from,
    id_telegram: id,
  });
  await ctx.reply('Please setup your profile.');
  ctx.scene.enter('setup-profile-wizard');
});
