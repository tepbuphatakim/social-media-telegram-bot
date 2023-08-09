import bot from './bot.js';
import { message } from 'telegraf/filters';
import { saveFileFromURL } from '../services/storage.js';

bot.on(message('photo'), async (ctx) => {
  const photos = ctx.message.photo;
  const url = await bot.telegram.getFileLink(photos.at(-1).file_id);
  const path = await saveFileFromURL(url);
  console.log(path);
});
