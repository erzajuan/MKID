'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('switches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      mount: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      actuation_force: {
        type: Sequelize.FLOAT
      },
      actuation_travel: {
        type: Sequelize.FLOAT
      },
      total_travel: {
        type: Sequelize.FLOAT
      },
      top_housing: {
        type: Sequelize.STRING
      },
      bottom_housing: {
        type: Sequelize.STRING
      },
      color: {
        type: Sequelize.STRING
      },
      lube: {
        type: Sequelize.STRING
      },
      sound: {
        type: Sequelize.STRING
      },
      keyboard_id: {
        type: Sequelize.INTEGER
      },
      brand_id: {
        type: Sequelize.INTEGER
      },
      switchcategory_id: {
        type: Sequelize.INTEGER
      },
      is_active: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('switches');
  }
};