import express, { Request, Response } from 'express';
import noteRouter from './routes/note';

const app = express();
const port = 3000;
const host = 'http://localhost';

app.use('/', express.json());
app.use('/note', noteRouter);

app.use('/', (req: Request, res: Response) => {
  res.send(`Unsupported route: ${req.path}`);
});

app.listen(port, () => {
  console.warn(`Express is listening on: ${host}:${port}`);
});
