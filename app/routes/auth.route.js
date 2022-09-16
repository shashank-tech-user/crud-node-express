module.exports = app => {
  const register = require("../controllers/auth.controller.js");
  var router = require("express").Router()

  router.use("/", register.register);

  app.use("/api/register", router); 
}