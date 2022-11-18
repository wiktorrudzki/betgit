const mysql = require("mysql");

const db = mysql.createConnection({
  host: "s7.cyber-folks.pl",
  user: "rumvgsauoa_wiktor",
  password: process.env.DATABASE_PASSWORD,
  database: "rumvgsauoa_betgit",
});

module.exports = { db };
