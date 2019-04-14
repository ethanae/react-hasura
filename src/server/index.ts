process.title = 'server';

import * as express from 'express';

const app = express();

app.get('/test', (req, res, next) => {
  res.send('Server is up');
});

app.listen('4001', () => console.log('Server is listening'));