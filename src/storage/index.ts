import config from '../config';
import AbstractStorage, { StorageType } from './abstract';
import MySQLStorage from './mySqlStorage';
import MongoStorage from './mongoStorage';

let storage;

switch (config.storage.use) {
  case StorageType.MONGODB: {
    storage = new MongoStorage();
    console.info(`Storage used: ${StorageType.MONGODB}`);
    break;
  }
  case StorageType.MYSQL: {
    storage = new MySQLStorage();
    console.info(`Storage used: ${StorageType.MYSQL}`);
    break;
  }
  default: {
    throw Error('Invalid strorage type configured');
  }
}

export default storage as AbstractStorage;
