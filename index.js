const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routers/user');
const port = process.env.PORT || 4000;

mongoose
  .connect('mongodb://localhost:27017/jwt')
  .then(() => console.log('Connection Success'))
  .catch(err => console.log(err));

mongoose.Promise = global.Promise;

const app = express();

app.use(express.json());
app.use(cors());

app.use('/user', userRouter);

app.use((req, res) => {
  res.sendStatus(404);
  res.end();
});

app.listen(port, () => console.log('Server is listening on port', port));
