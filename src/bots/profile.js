import bot from './bot.js';

bot.command('profile', (ctx) => {
  ctx.scene.enter('profile-scene');
});
