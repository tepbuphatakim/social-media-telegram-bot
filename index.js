import fs from 'fs';
import 'dotenv/config';

fs.readdirSync('./src/bots').forEach((file) => {
  import(`./src/bots/${file}`);
});

import('./src/routes/index.js');
