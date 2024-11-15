// migrations/XXXXXX-create-polygon.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('polygons', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4, // Automatically generate UUID
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      geometry: {
        type: Sequelize.GEOMETRY('POLYGON'), // Create a geometry field for polygons
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('polygons');
  },
};
