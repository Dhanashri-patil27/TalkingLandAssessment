
// models/Polygon.js
const { Model, DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid'); // Import UUID generation function

module.exports = (sequelize) => {
  class Polygon extends Model {}

  Polygon.init(
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
      geometry: {
        type: DataTypes.GEOMETRY('POLYGON'), // Use GEOMETRY for Polygon type
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'polygons',
    }
  );

  return Polygon;
};
