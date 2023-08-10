import { Composer, Scenes } from 'telegraf';
import { message } from 'telegraf/filters';
import { saveFileFromURL } from '../services/storage.js';
import { saveUser } from '../services/user.js';

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

const profileWizard = new Scenes.WizardScene(
  'profile-wizard',
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
    return ctx.scene.leave();
  }
);

export default profileWizard;
