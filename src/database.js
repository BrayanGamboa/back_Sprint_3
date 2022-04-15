const mysql = require("mysql");
require("dotenv").config();

const mysqlConnection = mysql.createConnection({
  host: process.env.HOST_DB,
  user: process.env.USER_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.DATABASE_DB,
  port: process.env.PORT_DB
});

 mysqlConnection.connect(function (err) {
  try {
    console.log("Base de datos correctamente enlazada");
  } catch {
    console.log(err);
  }
});
module.exports = mysqlConnection;

