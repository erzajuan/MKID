'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class keyboard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  keyboard.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.STRING,
    color: DataTypes.STRING,
    backlight: DataTypes.STRING,
    size: DataTypes.STRING,
    dimensions: DataTypes.STRING,
    wight: DataTypes.STRING,
    cable_type: DataTypes.STRING,
    cable_length: DataTypes.STRING,
    switch_mount: DataTypes.STRING,
    brand_id: DataTypes.INTEGER,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'keyboard',
  });
  return keyboard;
};