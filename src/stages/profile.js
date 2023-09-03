import { Composer, Scenes, Markup } from 'telegraf';
import { message } from 'telegraf/filters';
import { readFile, saveFileFromURL, deleteFile } from '../services/storage.js';
import { getUser, saveUser } from '../services/user.js';
import { getLatestFeedByIdUser, deleteFeed } from '../services/feed.js';

const profileScene = new Scenes.BaseScene('profile-scene');
profileScene.enter((ctx) => {
  return ctx.reply(
    'Click keyboard for your desire action.',
    Markup.keyboard([
      [
        Markup.button.callback('💁 My profile'),
        Markup.button.callback('👷 Setup profile'),
      ],
    ]).resize()
  );
});
profileScene.hears('💁 My profile', async (ctx) => {
  try {
    const { pf_photo, pf_name, pf_description } = await getUser(
      ctx.message.from.id
    );
    return ctx.replyWithPhoto(
      { source: readFile(pf_photo) },
      {
        caption: `${pf_name ?? '...'} | ${pf_description ?? '...'}`,
        parse_mode: 'Markdown',
        ...Markup.inlineKeyboard([
          [Markup.button.callback('My posts', '/my-posts')],
        ]),
      }
    );
  } catch (error) {
    console.error(error);
    return ctx.scene.enter('profile-scene');
  }
});
profileScene.action('/my-posts', async (ctx) => {
  return replyMyPost(ctx);
});
profileScene.action(/delete-post-(.+)/, async (ctx) => {
  await deleteFeed(ctx.match[1]);
  return ctx.reply('Deleted post.');
});
profileScene.action(/next-post-(.+)/, async (ctx) => {
  return replyMyPost(ctx, ctx.match[1]);
});
profileScene.hears('👷 Setup profile', (ctx) => {
  ctx.scene.enter('setup-profile-wizard');
});
profileScene.leave((ctx) => ctx.reply('Leave profile.'));

const profileUpload = new Composer();
profileUpload.on(message('photo'), async (ctx) => {
  try {
    const {
      message: {
        photo: photos,
        from: { id },
      },
    } = ctx;
    const url = await ctx.telegram.getFileLink(photos.at(-1).file_id);
    const path = await saveFileFromURL(url);
    const { pf_photo } = await getUser(id);
    deleteFile(pf_photo);
    await saveUser({
      pf_photo: path,
      pf_photo_telegram_server: url.href,
      id_telegram: id,
    });
    await ctx.reply('Please enter your profile name.');
    return ctx.wizard.next();
  } catch (error) {
    console.error(error);
    return ctx.scene.enter('profile-scene');
  }
});
profileUpload.on('message', (ctx) => {
  return ctx.reply('Please upload your profile photo.', {
    parse_mode: 'Markdown',
    ...Markup.inlineKeyboard([[Markup.button.callback('Cancel', '/cancel')]]),
  });
});
profileUpload.action('/cancel', async (ctx) => {
  return ctx.scene.enter('profile-scene');
});

const setupProfileWizard = new Scenes.WizardScene(
  'setup-profile-wizard',
  profileUpload,
  async (ctx) => {
    try {
      const {
        message: {
          text,
          from: { id },
        },
      } = ctx;
      await saveUser({
        pf_name: text,
        id_telegram: id,
      });
      await ctx.reply('Please enter your profile description.');
      return ctx.wizard.next();
    } catch (error) {
      console.error(error);
      return ctx.scene.enter('setup-profile-wizard');
    }
  },
  async (ctx) => {
    try {
      const {
        message: {
          text,
          from: { id },
        },
      } = ctx;
      await saveUser({
        pf_description: text,
        id_telegram: id,
      });
      return ctx.scene.enter('profile-scene');
    } catch (error) {
      console.error(error);
      return ctx.scene.enter('setup-profile-wizard');
    }
  }
);

async function replyMyPost(ctx, fromIdFeed = null) {
  try {
    const { id_user, pf_name } = await getUser(ctx.from.id);
    const { id_feed, photo, description } = await getLatestFeedByIdUser(
      id_user,
      fromIdFeed
    );

    return ctx.replyWithPhoto(
      { source: readFile(photo) },
      {
        caption: `${pf_name ?? '...'} | ${description ?? '...'}`,
        parse_mode: 'Markdown',
        ...Markup.inlineKeyboard([
          [Markup.button.callback('Delete', `/delete-post-${id_feed}`)],
          [Markup.button.callback('▼', `/next-post-${id_feed}`)],
        ]),
      }
    );
  } catch (error) {
    console.error(error);
    return ctx.scene.enter('profile-scene');
  }
}

export default [profileScene, setupProfileWizard];
