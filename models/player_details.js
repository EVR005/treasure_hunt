const { sequelize } = require("../connection/db_connect");
const { DataTypes, BOOLEAN, INTEGER, TIME } = require("sequelize");
const { userLogin } = require("./userlogin");

const playerDetails = sequelize.define("player_details", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  //   player_id: {
  //     type: DataTypes.INTEGER,
  //     references: {
  //       model: "userlogin",
  //       key: "id",
  //     },
  //     allowNull: false,
  //   },
  score: {
    type: DataTypes.INTEGER,
    default: 0,
    allowNull: false,
  },
  wronghits: {
    type: DataTypes.INTEGER,
    default: 0,
    allowNull: false,
  },
  gametime: {
    type: DataTypes.INTEGER,
    default: 0,
    allowNull: false,
  },
});

// playerDetails = sequelize.define("player_details", playerDetailsSchema);
userLogin.hasOne(playerDetails);
playerDetails.belongsTo(userLogin);

module.exports = { playerDetails };
