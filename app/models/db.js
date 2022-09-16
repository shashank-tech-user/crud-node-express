const mysql = require("mysql");
const dbConfig = require("../config/db.config");

// Create connection between application and database

const conn = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
})

conn.connect(error => {
  if (error) throw error;
  console.log("successfully connected");
});

module.exports = conn;
