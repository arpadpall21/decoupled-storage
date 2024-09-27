import fs from 'node:fs';
import objectMerge from 'object-merge';
import { StorageType } from './storage/abstract';

interface Config {
  server: {
    host: string;
    port: number;
  };
  storage: {
    use: StorageType;
    mongoDB: {
      host: string;
      port: number;
      db: string;
      collection: string;
    };
    MySQL: {
      host: string;
      port: number;
      user: string;
      password: string;
      db: string;
    };
  };
}

const defaultConfig: Config = {
  server: {
    host: 'localhost',
    port: 3000,
  },
  storage: {
    use: StorageType.FILE,
    mongoDB: {
      host: '',
      port: 0,
      db: '',
      collection: '',
    },
    MySQL: {
      host: '',
      port: 0,
      user: '',
      password: '',
      db: '',
    },
  },
};
let config: Config;

try {
  const customConfig: Config = JSON.parse(fs.readFileSync('./config/config.json', 'utf-8'));
  config = objectMerge(defaultConfig, customConfig) as Config;
} catch (err) {
  console.error('Failed to parse config/config.json');
  throw err;
}

export default config;
