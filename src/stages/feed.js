import { Composer, Scenes, Markup } from 'telegraf';
import { message } from 'telegraf/filters';
import { getFeed, createFeed, updateFeed } from '../services/feed.js';
import { getUser } from '../services/user.js';
import { readFile, saveFileFromURL } from '../services/storage.js';

const feedScene = new Scenes.BaseScene('feed-scene');
feedScene.enter((ctx) => {
  return ctx.reply(
    'Click keyboard to feed.',
    Markup.keyboard([
      [Markup.button.callback('🔍 Feed'), Markup.button.callback('🌏 Post')],
    ]).resize()
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
feedScene.hears('🌏 Post', (ctx) => {
  ctx.scene.enter('post-wizard');
});
feedScene.leave((ctx) => ctx.reply('Leave feed.'));

let id_feed = null;

const postUpload = new Composer();
postUpload.on(message('photo'), async (ctx) => {
  const {
    message: {
      photo: photos,
      from: { id },
    },
  } = ctx;
  const url = await ctx.telegram.getFileLink(photos.at(-1).file_id);
  const path = await saveFileFromURL(url);
  const { id_user } = await getUser(id);
  const feed = await createFeed({
    photo: path,
    photo_telegram_server: url.href,
    id_user,
  });
  id_feed = feed.id_feed;

  await ctx.reply('Please enter your post description.');
  return ctx.wizard.next();
});
postUpload.on('message', (ctx) => {
  ctx.reply('Please upload your post photo.');
});

const postWizard = new Scenes.WizardScene(
  'post-wizard',
  postUpload,
  async (ctx) => {
    const {
      message: { text },
    } = ctx;
    await updateFeed(id_feed, {
      description: text,
    });
    return ctx.scene.enter('feed-scene');
  }
);

export default [feedScene, postWizard];
