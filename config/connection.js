const Sequelize = require("sequelize");
require("dotenv").config();
// create a connection object
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : //database name , username, password
    new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      //database location
      host: "localhost",
      //what sql server is it is:
      dialect: "mysql",
      dialectOptions: {
        decimalNumbers: true,
      },
    });

module.exports = sequelize;
