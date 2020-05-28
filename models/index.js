'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
//const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config');
const db = {};

console.log(config);

//let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
 const sequelize = new Sequelize(config.db.database, 
    config.db.username, config.db.password, {
        host: config.db.host,
        dialect: 'postgres' 
    });
//}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

try {
sequelize.authenticate();
console.log('Connection has been established successfully.');
} catch (error) {
console.error('Unable to connect to the database:', error);
}


module.exports = db;
