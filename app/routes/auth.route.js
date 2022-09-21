module.exports = app => {
  const register = require("../controllers/auth.controller.js");
  var router = require("express").Router()

  router.post("/register", register.register);
  router.post("/login", register.login);

  app.use("/api", router); 
}