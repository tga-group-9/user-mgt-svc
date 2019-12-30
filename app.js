const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const userRouter = require('./src/routers/userRouter');

const app = express();
app.use(helmet());

//Body Parser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const port = 8080;


app.use('/user', userRouter);

app.use('/', (req, res) => {
  res.send('User mgt server OK tested ci cd!!!');
})

app.use((error, req, res, next) => {
  if (error) res.status(500).send({ statusCode: error.statusCode, msg: error.error.msg });
  next();
});

app.use((req, res) => {
  res.status(404).send('NOT Found.');
});

require('./src/db/dbConnect');

app.listen(port, () => {
  console.log('User mgt server listening at port- ', port);
});
