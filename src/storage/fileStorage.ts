import fs from 'node:fs';
import AbstractStorage, { Note } from './abstract';
import config from '../config';

const filePath = config.storage.mongoDB.host;

class FileStorage extends AbstractStorage {
  constructor() {
    super();

    try {
      fs.accessSync(filePath, fs.constants.F_OK);
    } catch {
      fs.writeFileSync(filePath, JSON.stringify({}));
      console.info(`File for file storage does not exists, new created :${filePath}`)
    }


  }

  async create(post: Note): Promise<boolean> {
    return true;
  }

  async read(id?: number): Promise<Note | Note[] | false> {
    return false;
  }

  async update(note: Note): Promise<boolean> {
    return true;
  }

  async delete(id: number): Promise<boolean> {
    return true;
  }
}

export default FileStorage;
