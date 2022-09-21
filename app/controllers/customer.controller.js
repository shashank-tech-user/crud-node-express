const uuid = require("uuid");
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const Customer = require("../models/customer.model.js");
const Address = require("../models/address.model.js");

exports.create = (req, res) => {
  const { body } = req;
  const { name, email, phone, address1, address2, city, state, country, zipcode } = body;
  if(!name || !email || !phone || !address1 || !address2 || !city || !state || !country || !zipcode) {
    res.status(400).send({
      error: true,
      message: "Please enter valid details"
    });
    return;
  }

  const data = new Customer({
    id: uuid.v4(),
    name,
    email,
    phone,
    password: md5(Math.random().toString(36).substr(2, 10)),
    created_at: new Date(),
    updated_at: new Date()
  });

  Customer.create(data, (err, result) => {
    if(err) {
      res.status(400).send({
        error: true,
        message: "Getting error while creating customer"
      });
      return;
    }

    let update = result;
    if(result) {
      const data = new Address({
        id: uuid.v4(),
        address1,
        address2,
        city,
        state,
        country,
        zipcode,
        customerId: result.id
      });

      Address.create(data, (err, result) => {
        if(err) {
          res.status(400).send({
            error: true,
            message: "Getting while adding address!"
          });
          return;
        }

        res.status(200).send({
          error: false,
          message: "Customer created successfully",
          data: {
            ...update,
            address_id: result.id,
            address1: result.address1,
            address2: result.address2,
            city: result.city,
            state: result.state,
            country: result.country,
            zipcode: result.zipcode,
          }
        });
        return;
      })
    }
  })
}

