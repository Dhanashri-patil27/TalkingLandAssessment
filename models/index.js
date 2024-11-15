const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');

// Get the current file name to avoid processing this file
const basename = path.basename(__filename);

// Set the environment and load the configuration
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '/../config/config.js'))[env];

// Initialize Sequelize with the database configuration
const sequelize = new Sequelize(config.database, config.username, config.password, config);

// Initialize the db object to store models
const db = {};

// Read all files in the current directory (models folder) and load them dynamically
fs.readdirSync(__dirname)
  .filter((file) => {
    // Filter out non-model files (e.g., this file, hidden files)
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach((file) => {
    // Dynamically require and initialize each model
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

// Set up associations if they exist
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Add sequelize and Sequelize to the db object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Export the db object
module.exports = db;
