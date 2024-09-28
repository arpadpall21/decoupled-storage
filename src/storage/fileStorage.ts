import fs, { promises as fsPromises } from 'node:fs';
import AbstractStorage, { Note } from './abstract';
import config from '../config';

const filePath = config.storage.file.path;

class FileStorage extends AbstractStorage {
  constructor() {
    super();

    try {
      const result = fs.readFileSync(filePath);
      JSON.parse(result.toString());
      console.info(`File used for file storage: ${filePath}`);
    } catch {
      throw Error('Invalid file configured for file storage');
    }
  }

  async create(post: Note): Promise<boolean> {
    try {
      const fileStorage = await this.readFileStorage();

      if (fileStorage[post.id]) {
        return false;
      }

      fileStorage[post.id] = post;
      await this.writeFileStorage(fileStorage);
      console.info('Record created: ', post);

      return true;
    } catch {
      console.error('Failed to create record: ', post);
      return false;
    }
  }

  async read(id?: number): Promise<Note | Note[] | false> {
    try {
      const fileStorage = await this.readFileStorage();

      if (!id) {
        const result: Note[] = [];
        for (const noteKey in fileStorage) {
          result.push(fileStorage[noteKey]);
        }

        return result;
      } else if (fileStorage[id]) {
        return fileStorage[id];
      } else {
        return false;
      }
    } catch {
      console.error('Failed to read record(s)');
      return false;
    }
  }

  async update(note: Note): Promise<boolean> {
    try {
      const fileStorage = await this.readFileStorage();

      if (!fileStorage[note.id]) {
        return false;
      }

      fileStorage[note.id] = note;
      await this.writeFileStorage(fileStorage);
      return true;
    } catch {
      console.error('Failed to update note: ', note);
      return false;
    }
  }

  async delete(id: number): Promise<boolean> {
    // if (!this.conntected) {
    //   console.error('Database delete opreation failed, no database connected!');
    //   return false;
    // }

    // const result = await NotesModel.deleteOne({ _id: id });
    // return result.deletedCount === 1 ? true : false;
    
    
    
    return false;
  }

  private async readFileStorage(): Promise<{ [key: string]: Note }> {
    const result = await fsPromises.readFile(filePath);
    return JSON.parse(result.toString());
  }

  private async writeFileStorage(storage: object): Promise<boolean> {
    await fsPromises.writeFile(filePath, JSON.stringify(storage));
    return true;
  }
}

export default FileStorage;
