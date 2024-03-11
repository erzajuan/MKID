const { encrypt } = require("../services/bcrypt");
("use strict");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init(
    {
      username: DataTypes.STRING,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
      img_profile: DataTypes.STRING,
      is_active: DataTypes.BOOLEAN,
    },
    {
      hooks: {
        beforeCreate: function (user, options) {
          user.password = encrypt(user.password);
          user.role = "user";
          user.is_active = true;
        },
      },
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
