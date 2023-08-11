import { Composer, Scenes, Markup } from 'telegraf';
import { message } from 'telegraf/filters';
import { readFile, saveFileFromURL } from '../services/storage.js';
import { getUser, saveUser } from '../services/user.js';

const profileScene = new Scenes.BaseScene('profile-scene');
profileScene.enter((ctx) => {
  return ctx.reply(
    'Click keyboard for your desire action.',
    Markup.keyboard([
      Markup.button.callback('🔍 My profile'),
      Markup.button.callback('🔍 Setup profile'),
    ]).resize()
  );
});
profileScene.hears('🔍 My profile', async (ctx) => {
  try {
    const { pf_photo, pf_name, pf_description } = await getUser(
      ctx.message.from.id
    );
    ctx.replyWithPhoto(
      { source: readFile(pf_photo) },
      {
        caption: `${pf_name} | ${pf_description}`,
        parse_mode: 'Markdown',
      }
    );
  } catch (error) {
    console.error(error);
  }
});
profileScene.hears('🔍 Setup profile', (ctx) => {
  ctx.scene.enter('setup-profile-wizard');
});
profileScene.leave((ctx) => ctx.reply('Leave profile.'));

const profileUpload = new Composer();
profileUpload.on(message('photo'), async (ctx) => {
  const {
    message: {
      photo: photos,
      from: { id },
    },
  } = ctx;
  const url = await ctx.telegram.getFileLink(photos.at(-1).file_id);
  const path = await saveFileFromURL(url);
  await saveUser({
    pf_photo: path,
    pf_photo_telegram_server: url.href,
    id_telegram: id,
  });
  await ctx.reply('Please enter your profile name.');
  return ctx.wizard.next();
});
profileUpload.on('message', (ctx) => {
  ctx.reply('Please upload your profile photo.');
});

const setupProfileWizard = new Scenes.WizardScene(
  'setup-profile-wizard',
  profileUpload,
  async (ctx) => {
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
  },
  async (ctx) => {
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
  }
);

export default [profileScene, setupProfileWizard];
