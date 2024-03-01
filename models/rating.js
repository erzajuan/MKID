'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  rating.init({
    score: DataTypes.FLOAT,
    comment: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    keyboard_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'rating',
  });
  return rating;
};