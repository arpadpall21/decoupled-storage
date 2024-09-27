import express, { Request, Response } from 'express';
import noteRouter from './routes/note';
import config from './config';

console.info('Server initialized with config:', config);

const app = express();
const host = config.server.host;
const port = config.server.port;

app.use('/', express.json());
app.use('/note', noteRouter);

app.use('/', (req: Request, res: Response) => {
  res.send(`Unsupported route: ${req.path}`);
});

app.listen(port, () => {
  console.warn(`Express is listening on: ${host}:${port}`);
});
