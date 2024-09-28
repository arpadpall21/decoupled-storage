# Decoupled Storage


## Description
  - This project features a decoupled storage solution for a simple server
  - We can connect different storages by implementing the `AbstractStorage` abstract class (file, MySQL and MongoDB implemented)
  - This is a template not a production ready code (basic response format used, no validation, basic logging, etc...)

## Requirements
  - nodejs v22.3.0
  - MySQL database (optional)
  - MongoDB database (optional)

## Setup
  - Run `npm install` to install dependencies

## Usage
  - Build & start the server with `npm run build && npm start`
  - Database connections can be configured by `config/config.json`
    - The `storage.use` property controls which storage type to use (available: `file` | `mongoDB` | `MySQL`) (Default: `file`)

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