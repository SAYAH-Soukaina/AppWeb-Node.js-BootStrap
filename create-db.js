"use strict";

const Sqlite = require('better-sqlite3');

let db = new Sqlite('db.sqlite');

db.prepare('DROP TABLE IF EXISTS user').run();
db.prepare('CREATE TABLE user (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, password TEXT)').run();
db.prepare("INSERT INTO user (name, password) VALUES ('admin', 'miam')").run();
