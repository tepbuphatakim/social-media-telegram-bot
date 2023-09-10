import express from 'express';
import userRoute from './user.js';
import feedRoute from './feed.js';
import friendRoute from './friend.js';

const app = express();
const port = 3000;

app.use('/users', userRoute);
app.use('/feeds', feedRoute);
app.use('/friends', friendRoute);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
