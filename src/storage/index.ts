import MySQLStorage from './mySqlStorage';
import MongoStorage from './mongoStorage';

const useMongoEvnVar = process.env?.NODE_USE_MONGODB;

export default useMongoEvnVar ? MongoStorage : MySQLStorage;
