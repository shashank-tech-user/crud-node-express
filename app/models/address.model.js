const sql = require("./db.js");

const Address = function(data) {
  this.id = data.id;
  this.address1 = data.address1;
  this.address2 = data.address2;
  this.city = data.city;
  this.state = data.state;
  this.country = data.country;
  this.zipcode = data.zipcode;
  this.customer_id = data.customerId;
}

Address.create = (data, result) => {
  sql.query("insert into customer_address set ?", data, (err, res) => {
    if(err){
      result(null, err);
      return;
    }
    result(null, data);
  })
}

module.exports = Address;