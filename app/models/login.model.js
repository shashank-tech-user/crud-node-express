const sql = require("./db.js");

const Login = function(data) {
  this.email = data.email;
  this.password = data.password;
}

Login.login = (data, result) => {
  sql.query(`select id, name, email, created_at, updated_at from user where email="${data.email}" and password="${data.password}"`, (err, res) => {
    if(err) {
      result(null, err);
      return;
    }
    result(null, res);
    return;
  })
}

module.exports = Login;