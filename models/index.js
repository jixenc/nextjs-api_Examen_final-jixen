import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
import configFile from '../config/config.json' assert { type: "json" };

const basename = path.basename(import.meta.url);
const env = process.env.NODE_ENV || 'development';
const config = configFile[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

fs.readdirSync(new URL('.', import.meta.url).pathname)
  .filter(file => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach(async file => {
    const model = (await import(path.join(new URL('.', import.meta.url).pathname, file))).default(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
