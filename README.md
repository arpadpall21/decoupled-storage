# Decoupled Storage


## Description
  - This project features a decoupled storage solution for a simple server
  - We can connect different storages by implementing the `AbstractStorage` abstract class (MySQL and MongoDB implemented currently)
  - This is a templated for the described approach not a production ready code (basic message format used, no validation, basic logging, etc...)

## Requirements
  - nodejs v22.3.0
  - MySQL database
  - MongoDB database (optional)

## Setup
  - Run `npm install` to install dependencies
  - Required database connections:
```
##### MySQL #####
host: localhost
port: 3306
user: test_user;
password: pass;
database: test_db;

##### MongoDB #####
host: localhost
port: 27017
database: test_db;
```

## Usage
  - Build & start the server with `npm run build && npm start`
  - By default the server connects to MySQL, set the `NODE_USE_MONGODB` environment variable to true in order to use MongoDB (run: `export NODE_USE_MONGODB=1`)
  

##### Request Examples:
```
##### create a few records #####
POST http://localhost:3000/note 
{
  "id": 1,
  "author": "Doe",
  "content": "Doe's content..."
}

POST http://localhost:3000/note 
{
  "id": 2,
  "author": "John",
  "content": "John's content..."
}

POST http://localhost:3000/note
{
  "id": 3,
  "author": "Franky",
  "content": "Franky's content..."
}


##### get single record (or all records) #####
GET http://localhost:3000/note/1
GET http://localhost:3000/note


##### update record #####
PUT http://localhost:3000/note
{
  "id": 2,
  "author": "Sally",
  "content": "Sally's content..."
}


##### delete record #####
DELETE http://localhost:3000/note/1
```