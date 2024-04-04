const mysql = require("mysql");
const database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.password,
  database: "University",
});
module.exports = database;
