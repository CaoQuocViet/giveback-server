'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Charities', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT
      },
      licenseDescription: {
        type: Sequelize.TEXT,
        field: 'license_description'
      },
      rating: {
        type: Sequelize.DECIMAL,
        defaultValue: 0
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Charities');
  }
};