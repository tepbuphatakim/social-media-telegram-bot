import { Telegraf, session, Scenes } from 'telegraf';
import profileWizard from '../stages/profile.js';

const bot = new Telegraf(process.env.BOT_TOKEN);

const stage = new Scenes.Stage([profileWizard]);

bot.use(session());
bot.use(stage.middleware());
bot.launch();

export default bot;
