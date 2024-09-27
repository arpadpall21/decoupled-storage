export enum StorageType {
  FILE = 'file',
  MONGODB = 'mongoDB',
  MYSQL = 'MySQL',
}

export interface Note {
  id: number;
  author?: string;
  content?: string;
}

abstract class AbstractStorage {
  // instance = one db connection

  abstract create(note: Note): Promise<boolean>;

  abstract read(id?: number): Promise<Note | Note[] | false>;

  abstract update(note: Note): Promise<boolean>;

  abstract delete(id: number): Promise<boolean>;
}

export default AbstractStorage;
