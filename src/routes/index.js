import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoute from './user.js';
import feedRoute from './feed.js';
import friendRoute from './friend.js';
import authRoute from './auth.js';
import { authentication } from '../middlewares/auth.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(authRoute);

app.use(authentication);

app.use('/users', userRoute);
app.use('/feeds', feedRoute);
app.use('/friends', friendRoute);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
