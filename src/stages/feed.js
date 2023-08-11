import { Scenes, Markup } from 'telegraf';
import { getFeed } from '../services/feed.js';
import { readFile } from '../services/storage.js';

const feedScene = new Scenes.BaseScene('feed-scene');
feedScene.enter((ctx) => {
  return ctx.reply(
    'Click keyboard to feed.',
    Markup.keyboard([Markup.button.callback('🔍 Feed')]).resize()
  );
});
feedScene.hears('🔍 Feed', async (ctx) => {
  try {
    const { photo, description } = await getFeed();
    ctx.replyWithPhoto(
      { source: readFile(photo) },
      {
        caption: `name | ${description}`,
        parse_mode: 'Markdown',
      }
    );
  } catch (error) {
    console.error(error);
  }
});
feedScene.leave((ctx) => ctx.reply('Leave feed.'));

export default feedScene;
