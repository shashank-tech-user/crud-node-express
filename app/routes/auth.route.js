module.exports = app => {
  const register = require("../controllers/auth.controller.js");
  var router = require("express").Router()

  router.use("/register", register.register);
  router.use("/login", register.login);

  app.use("/api", router); 
}