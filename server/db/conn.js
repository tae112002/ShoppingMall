const mysql = require("mysql");
require("dotenv").config();

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;
const conn = mysql.createConnection({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  multipleStatements: true,
  dateStrings: "date",
});

conn.connect((err) => {
  if (err) throw err;
  console.log("mysql db connected..");
});

module.exports = conn;
