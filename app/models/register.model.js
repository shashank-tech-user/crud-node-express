const sql = require("./db.js");

const Register = function(data) {
  this.id = data.id,
  this.name = data.name,
  this.email = data.email,
  this.password = data.password,
  this.created_at = data.created_at,
  this.updated_at = data.updated_at
}

Register.register = (data, result) => {
  sql.query("insert into user set ?", data, (err, res) => {
    if(err) {
      result(null, err);
      return;
    }

    result(null, {
      u_id: res.insertedId,
      ...data
    });
    return;
  })
}

module.exports = Register;
