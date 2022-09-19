module.exports = app => {
  const tutorial = require("../controllers/tutorial.controller.js");
  const auth = require("../middleware/auth.js");

  var router = require("express").Router();

  // Create a new tutorial - Route
  router.post("/", auth, tutorial.create);

  // Fetch all the records of tutorial -Route
  router.get("/", auth, tutorial.findAll);

  // Fetch single record of tutorial - Route
  router.get("/:id", auth, tutorial.findOne);

  // Update record of tutorial - Route
  router.put("/:id", auth, tutorial.updateById);

  // Delete record of tutorial - Route
  router.delete("/:id", auth, tutorial.delete);

  app.use("/api/tutorials", router);
}