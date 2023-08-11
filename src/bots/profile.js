import bot from './bot.js';

bot.command('profile', (ctx) => {
  ctx.scene.enter('setup-profile-wizard');
});

// bot.command('view-profile', (ctx) => {
//   ctx.replyWithPhoto(
//     { source: readFile(photo) },
//     {
//       caption: `name\\${description}`,
//       parse_mode: 'Markdown',
//     }
//   );
// });
