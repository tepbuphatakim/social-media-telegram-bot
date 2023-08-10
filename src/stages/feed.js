import { Scenes, Markup } from 'telegraf';

const feedScene = new Scenes.BaseScene('feed-scene');

feedScene.enter((ctx) => {
  return ctx.reply(
    'Click keyboard to feed.',
    Markup.keyboard([Markup.button.callback('🔍 Feed', 'fetch-feed')]).resize()
  );
});
feedScene.leave((ctx) => ctx.reply('Leave feed.'));
feedScene.command('back', (ctx) => ctx.scene.leave());
feedScene.on('message', (ctx) => {
  if (ctx.message === '🔍 Feed') {
    ctx.reply(ctx.message);
  }
  console.log(ctx.message);
});

export default feedScene;
