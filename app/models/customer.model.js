const sql = require("./db.js");

const Customer = function(data) {
  this.id = data.id;
  this.name = data.name;
  this.email = data.email;
  this.phone = data.phone;
  this.password = data.password;
  this.created_at = data.created_at;
  this.updated_at = data.updated_at;
}

Customer.create = (data, result) => {
  sql.query('insert into customer set ?', data, (err, res) => {
    if(err) {
      result(null, err);
      return;
    }
    result(null, data);
  })  
}

Customer.findOne = (customerId, result) => {
  sql.query(`select c.*, cs.id as address_id, cs.address1, cs.address2, cs.city, cs.state, cs.country, from customer as c join customer_address as cs on cs.customer_id = c.id where id="${customerId}"`, (err, res) => {
    if(err) {
      result(null, err);
      return;
    }
    result(null, res);
  });
}

Customer.findAll = (result) => {
  sql.query(`select c.* from customer as c join customer_address as cs on cs.customer_id = c.id`, (err, res) => {
    if(err) {
      result(null, err);
      return;
    }
    result(null, res);
  });
}


module.exports = Customer;