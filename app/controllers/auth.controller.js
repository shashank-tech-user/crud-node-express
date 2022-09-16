const Register = require("../models/register.model.js");
const uuid = require("uuid");
const md5 = require('md5');

exports.register = (req, res) => {
  if(!req.body.name || req.body.name === "")
    return res.status(400).send({ message: "Name field required*"});
  
  if(!req.body.email || req.body.email === "")
    return res.status(400).send({ message: "Email field required*"});

  if(!req.body.password || req.body.password === "")
    return res.status(400).send({ message: "Password field required*"});

  if(!req.body.confirm_password || req.body.confirm_password === "")
    return res.status(400).send({ message: "Confirm Password field required*"});

  if(req.body.password !== req.body.confirm_password)
    return res.status(400).send({ message: "Both password field value should be same*"});

  const user = new Register({
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    password: md5(req.body.password),
    created_at: new Date(), 
    updated_at: new Date()
  });

  Register.register(user, (err, result) => {
    if(err) {
      res.status(400).send({
        error: true,
        message: "Getting error while register user"
      });
      return;
    }
    res.status(200).send({
      error: false,
      message: "Register user successfully",
      data: result
    });
  });
}