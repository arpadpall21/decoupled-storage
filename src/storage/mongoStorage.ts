import AbstractStorage, { Note } from './abstract';
import mongoose from 'mongoose';

const host = 'localhost';
const port = 27017;
const db = 'test_db';
const collection = 'test_collection';

interface MongoDocNote {
  _id: number | null | undefined;
  author?: string | null | undefined;
  content?: string | null | undefined;
}

mongoose.connection.on('connected', () => console.info('Database connection estabilished'));
mongoose.connection.on('error', (err) => console.error('Failed to connect to the database!', err));

const notesSchema = new mongoose.Schema({
  _id: { type: Number, require: true },
  author: String,
  content: String,
});

const NotesModel = mongoose.model(collection, notesSchema);

class MongoStorage extends AbstractStorage {
  public conntected: boolean;

  constructor() {
    super();
    this.conntected = false;

    mongoose
      .connect(`mongodb://${host}:${port}/${db}`)
      .then(() => (this.conntected = true))
      .catch(() => (this.conntected = false));
  }

  async create(post: Note): Promise<boolean> {
    if (!this.conntected) {
      console.error('Database create opreation failed, no database connected!');
      return false;
    }

    const postDocument = { _id: post.id, author: post.author, content: post.content };
    try {
      await NotesModel.create(postDocument);
      console.info('Record created: ', post);
      return true;
    } catch (err) {
      console.error('Failed to create record: ', post);
      return false;
    }
  }

  async read(id?: number): Promise<Note | Note[] | false> {
    if (!this.conntected) {
      console.error('Database read opreation failed, no database connected!');
      return false;
    }

    if (id) {
      console.info(`Getting record with id: ${id}`);
      const result = await NotesModel.findOne({ _id: id });
      return result ? this.mongoDocNoteToNote(result) : false;
    }

    console.info('Getting all records');
    const result = await NotesModel.find();
    return result.map((doc) => this.mongoDocNoteToNote(doc));
  }

  async update(note: Note): Promise<boolean> {
    if (!this.conntected) {
      console.error('Database update opreation failed, no database connected!');
      return false;
    }

    const result = await NotesModel.updateOne(
      { _id: note.id },
      { _id: note.id, author: note.author, content: note.content },
    );
    return result.modifiedCount === 1 ? true : false;
  }

  async delete(id: number): Promise<boolean> {
    if (!this.conntected) {
      console.error('Database delete opreation failed, no database connected!');
      return false;
    }

    const result = await NotesModel.deleteOne({ _id: id });
    return result.deletedCount === 1 ? true : false;
  }

  private mongoDocNoteToNote(doc: MongoDocNote): Note {
    return {
      // eslint-disable-next-line no-underscore-dangle
      id: doc._id ? doc._id : -1,
      author: doc.author ? doc.author : undefined,
      content: doc.content ? doc.content : undefined,
    };
  }
}

export default MongoStorage;
