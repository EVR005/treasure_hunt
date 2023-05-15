const { sequelize } = require("../connection/db_connect");
const { DataTypes, BOOLEAN, INTEGER, TIME } = require("sequelize");

const Clues = sequelize.define("clues", {
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  clue: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  answer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  right_path: {
    type: BOOLEAN,
    allowNull: false,
  },
});

module.exports = { Clues };
