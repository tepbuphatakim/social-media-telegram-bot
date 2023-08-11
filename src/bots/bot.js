import { Telegraf, session, Scenes } from 'telegraf';
import profileStage from '../stages/profile.js';
import feedScene from '../stages/feed.js';

const bot = new Telegraf(process.env.BOT_TOKEN);

const stage = new Scenes.Stage([...profileStage, ...feedScene]);

bot.use(session());
bot.use(stage.middleware());
bot.launch();

export default bot;
