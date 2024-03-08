'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class keyswitch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  keyswitch.init({
    name: DataTypes.STRING,
    mount: DataTypes.STRING,
    type: DataTypes.STRING,
    image: DataTypes.STRING,
    image: DataTypes.STRING,
    actuation_force: DataTypes.FLOAT,
    actuation_travel: DataTypes.FLOAT,
    total_travel: DataTypes.FLOAT,
    top_housing: DataTypes.STRING,
    bottom_housing: DataTypes.STRING,
    color: DataTypes.STRING,
    lube: DataTypes.STRING,
    sound: DataTypes.STRING,
    keyboard_id: DataTypes.INTEGER,
    brand_id: DataTypes.INTEGER,
    switchcategory_id: DataTypes.INTEGER,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'keyswitch',
  });
  return keyswitch;
};