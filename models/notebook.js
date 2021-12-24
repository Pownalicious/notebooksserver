"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class notebook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      notebook.hasMany(models.note);
    }
  }
  notebook.init(
    {
      title: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "notebook",
    }
  );
  return notebook;
};
