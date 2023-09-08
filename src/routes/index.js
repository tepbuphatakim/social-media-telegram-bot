import express from 'express';
import userRoute from './user.js';
const app = express();
const port = 3000;

app.use('/users', userRoute);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
