import { Sequelize, DataTypes } from 'sequelize';
import AbstractStorage, { Note } from './abstract';
import config from '../config';

const host = config.storage.MySQL.host;
const port = config.storage.MySQL.port;
const user = config.storage.MySQL.user;
const password = config.storage.MySQL.password;
const db = config.storage.MySQL.db;

const sequelize = new Sequelize(`mysql://${user}:${password}@${host}:${port}/${db}`);

const NotesModel = sequelize.define(
  'Notes',
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true },
    author: DataTypes.STRING,
    content: DataTypes.STRING(1024),
  },
  { timestamps: false },
);

class MySQLStorage extends AbstractStorage {
  public conntected: boolean;

  constructor() {
    super();
    this.conntected = false;

    sequelize
      .authenticate()
      .then(() => {
        NotesModel.sync({ alter: true });
        this.conntected = true;
        console.info('Database connection estabilished');
      })
      .catch((err) => {
        this.conntected = false;
        console.error('Failed to connect to the database!', err);
      });
  }

  async create(post: Note): Promise<boolean> {
    if (!this.conntected) {
      console.error('Database create opreation failed, no database connected!');
      return false;
    }

    try {
      await NotesModel.create({ ...post });
      console.info('Record created: ', post);
      return true;
    } catch (err) {
      console.error('Failed to create record: ', post);
      console.error(err);
      return false;
    }
  }

  async read(id?: number): Promise<Note | Note[] | false> {
    if (!this.conntected) {
      console.error('Database read opreation failed, no database connected!');
      return false;
    }

    if (id) {
      console.info(`Getting record with primary key: ${id}`);
      const result = await NotesModel.findByPk(id);
      return result ? result.dataValues : false;
    }

    console.info('Getting all records');
    const result = await NotesModel.findAll();
    return result.map((record) => record.dataValues);
  }

  async update(note: Note): Promise<boolean> {
    if (!this.conntected) {
      console.error('Database update opreation failed, no database connected!');
      return false;
    }

    console.info(`Updating record with primary key: ${note.id}`);
    const result = await NotesModel.update({ ...note }, { where: { id: note.id } });
    return result[0] ? true : false;
  }

  async delete(id: number): Promise<boolean> {
    if (!this.conntected) {
      console.error('Database delete opreation failed, no database connected!');
      return false;
    }

    console.info(`Deleting record with primary key: ${id}`);
    const result = await NotesModel.destroy({ where: { id } });
    return result === 1 ? true : false;
  }
}

export default MySQLStorage;
