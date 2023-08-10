import { Telegraf, session, Scenes } from 'telegraf';
import profileWizard from '../stages/profile.js';
import feedScene from '../stages/feed.js';

const bot = new Telegraf(process.env.BOT_TOKEN);

const stage = new Scenes.Stage([profileWizard, feedScene]);

bot.use(session());
bot.use(stage.middleware());
bot.launch();

export default bot;
