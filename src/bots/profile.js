import bot from './bot.js';
import { Scenes, session } from 'telegraf';
import { message } from 'telegraf/filters';
import { saveFileFromURL } from '../services/storage.js';
import { saveUser } from '../services/user.js';

const sceneProfile = new Scenes.BaseScene('scene-profile');
sceneProfile.enter((ctx) => ctx.reply('Please upload your profile photo.'));
sceneProfile.on(message('photo'), async (ctx) => {
  const photos = ctx.message.photo;
  const url = await bot.telegram.getFileLink(photos.at(-1).file_id);
  const path = await saveFileFromURL(url);
  await saveUser({
    pf_photo: path,
    id_telegram: ctx.message.from.id,
  });

  ctx.reply('Please provide your name');
  ctx.scene.leave();
});
sceneProfile.on('message', (ctx) => {
  ctx.reply('Please upload your profile photo.');
});

const stage = new Scenes.Stage([sceneProfile]);

bot.use(session());
bot.use(stage.middleware());

bot.command('profile', (ctx) => {
  console.log(ctx.scene);
  ctx.scene.enter('scene-profile');
});
