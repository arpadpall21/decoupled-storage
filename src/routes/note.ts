import { Router, Request, Response } from 'express';
import storage from '../storage';
import { Note } from '../storage/abstract';

const noteRouter = Router();

noteRouter
  .get('/:id?', async (req: Request, res: Response<Note | Note[] | false>) => {
    const id = req.params.id;
    if (id !== undefined && Number.isNaN(Number.parseInt(id))) {
      res.send(false);
      return;
    }

    res.send(await storage.read(Number.parseInt(id)));
  })

  .post('/', async (req: Request<object, boolean, Note>, res) => {
    if (!req.body.id || typeof req.body.id !== 'number') {
      res.send(false);
      return;
    }

    res.send(await storage.create(req.body));
  })

  .put('/', async (req: Request<object, boolean, Note>, res) => {
    if (!req.body.id || typeof req.body.id !== 'number') {
      res.send(false);
      return;
    }

    res.send(await storage.update(req.body));
  })

  .delete('/:id', async (req: Request, res: Response<boolean>) => {
    const id = req.params.id;
    if (Number.isNaN(Number.parseInt(id))) {
      res.send(false);
      return;
    }

    res.send(await storage.delete(Number.parseInt(id)));
  });

export default noteRouter;
