"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class adminuser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  adminuser.init(
    {
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      phonenumber: DataTypes.INTEGER,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      referral_email: DataTypes.STRING,
      email_token: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      activated: {
        allowNull: true,
        type: DataTypes.TINYINT,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "adminuser",
    }
  );
  return adminuser;
};
