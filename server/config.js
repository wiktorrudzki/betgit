const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: process.env.MYSQL_PASSWORD,
  database: "betgit",
});

module.exports = { db };
