// models/Point.js
const { Model, DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid'); // Import UUID generation function

module.exports = (sequelize) => {
  class Point extends Model {}

  Point.init(
    {
      id: {
        type: DataTypes.UUID, // Set type to UUID
        defaultValue: uuidv4, // Automatically generate UUID
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      coordinates: {
        type: DataTypes.GEOMETRY('POINT'),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'points',
    }
  );

  return Point;
};