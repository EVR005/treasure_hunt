// const mysql = require("mysql");

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "raju5",
//   password: "raju5",
//   database: "treasure_hunt",
// });

// const sequelize = () => {
//   connection.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected Database!");
//   });
// };

// module.exports = { sequelize };

const Sequelize = require("sequelize");
require("dotenv").config();
// const sequelize = new Sequelize("treasure_hunt", "raju5", "raju5", {
//   host: "localhost",
//   port: 3306,
//   dialect: "mysql",
//   dialectModule: require("mysql2"),
// });
// const sequelize = new Sequelize(
//   "postgresql://raju5:v2_44JKZ_RZG423xZsLxSCyL2CmjyS6C@db.bit.io:5432/raju5/treasure_hunt?sslmode=true"
// );

//psql '?sslmode=require'

const sequelize = new Sequelize(process.env.DB_CONN, {
  dialect: "postgres", // Set the database dialect to PostgreSQL
  dialectOptions: {
    ssl: {
      require: true, // Use SSL to secure the connection
      rejectUnauthorized: false, // Allow self-signed certificates (if applicable)
    },
  },
});

module.exports = { sequelize };
