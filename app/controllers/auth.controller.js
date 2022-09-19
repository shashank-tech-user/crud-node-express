const Register = require("../models/register.model.js");
const Login = require("../models/login.model.js");
const uuid = require("uuid");
const md5 = require('md5');
const jwt = require("jsonwebtoken");

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

exports.login = (req, res) => {
  if(!req.body.email || req.body.email === "")
    return res.status(400).send({ message: "Email field required*"});

  if(!req.body.password || req.body.password === "")
    return res.status(400).send({ message: "Password field required*"});
  
  // console.log("req.body => ", req.body);
  // console.log("req.files => ", req.files);
  // return;

  const user = new Login({
    email: req.body.email,
    password: md5(req.body.password)
  });

  Login.login(user, (err, result) => {
    if(err) {
      res.status(400).send({
        error: true,
        message: "Getting error while register user"
      });
      return;
    }

    if(result.length === 0) {
      res.status(404).send({
        error: true,
        message: "Please enter valid email and password"
      });
      return;
    }

    const token = jwt.sign(
      { user_id: result.email  }, 
      process.env.JWT_SECRET_KEY, {
      expiresIn: "2d"
    });

    result[0]["access_token"] = `Bearer ${token}`;
    res.status(200).send({
      error: false,
      message: "Login successfully",
      data: result
    });
    return;
  })
}
