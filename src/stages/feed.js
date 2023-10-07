import { Composer, Scenes, Markup } from 'telegraf';
import { message } from 'telegraf/filters';
import {
  getFeed,
  getLatestFeedByIdUser,
  createFeed,
  updateFeed,
} from '../services/feed.js';
import { getUser, getUserById, addFriend } from '../services/user.js';
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
    const { id_user, photo, description } = await getFeed();
    const { pf_name } = await getUserById(id_user);
    return ctx.replyWithPhoto(
      { source: readFile(photo) },
      {
        caption: `${pf_name.replace(/[*_]/g, ' ') ?? '...'} | ${
          description.replace(/[*_]/g, ' ') ?? '...'
        }`,
        parse_mode: 'Markdown',
        ...Markup.inlineKeyboard([
          [Markup.button.callback('Add friend', `/add-friend-${id_user}`)],
        ]),
      }
    );
  } catch (error) {
    console.error(error);
    return ctx.scene.enter('feed-scene');
  }
});
feedScene.action(/add-friend-(.+)/, async (ctx) => {
  const { id_user } = await getUser(ctx.from.id);
  if (Number(id_user) === Number(ctx.match[1])) {
    return ctx.reply(`You can't add yourself.`);
  }

  await addFriend(id_user, ctx.match[1]);
  return ctx.reply('Added friend.');
});
feedScene.hears('🌏 Post', (ctx) => {
  return ctx.scene.enter('post-wizard');
});

const postUpload = new Composer();
postUpload.on(message('photo'), async (ctx) => {
  try {
    const {
      message: {
        photo: photos,
        from: { id },
      },
    } = ctx;
    const url = await ctx.telegram.getFileLink(photos.at(-1).file_id);
    const path = await saveFileFromURL(url);
    const { id_user } = await getUser(id);
    await createFeed({
      photo: path,
      photo_telegram_server: url.href,
      id_user,
    });

    await ctx.reply('Please enter your post description.');
    return ctx.wizard.next();
  } catch (error) {
    console.error(error);
    ctx.reply('No profile setup yet.');
    return ctx.scene.enter('feed-scene');
  }
});
postUpload.on('message', (ctx) => {
  return ctx.reply('Please upload your post photo.', {
    parse_mode: 'Markdown',
    ...Markup.inlineKeyboard([[Markup.button.callback('Cancel', '/cancel')]]),
  });
});
postUpload.action('/cancel', async (ctx) => {
  return ctx.scene.enter('feed-scene');
});

const postWizard = new Scenes.WizardScene(
  'post-wizard',
  postUpload,
  async (ctx) => {
    try {
      const {
        message: { text },
        from: { id },
      } = ctx;
      const { id_user } = await getUser(id);
      const { id_feed } = await getLatestFeedByIdUser(id_user);
      await updateFeed(id_feed, {
        description: text,
      });
      return ctx.scene.enter('feed-scene');
    } catch (error) {
      console.error(error);
      return ctx.scene.enter('post-wizard');
    }
  }
);

export default [feedScene, postWizard];
