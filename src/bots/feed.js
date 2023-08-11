import bot from './bot.js';

bot.command('feed', (ctx) => {
  ctx.scene.enter('feed-scene');
});
