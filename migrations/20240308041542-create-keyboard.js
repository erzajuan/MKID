'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('keyboards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      color: {
        type: Sequelize.STRING
      },
      backlight: {
        type: Sequelize.STRING
      },
      size: {
        type: Sequelize.STRING
      },
      dimensions: {
        type: Sequelize.STRING
      },
      wight: {
        type: Sequelize.STRING
      },
      cable_type: {
        type: Sequelize.STRING
      },
      cable_length: {
        type: Sequelize.STRING
      },
      switch_mount: {
        type: Sequelize.STRING
      },
      brand_id: {
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
    await queryInterface.dropTable('keyboards');
  }
};