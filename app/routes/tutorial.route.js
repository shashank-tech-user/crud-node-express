module.exports = app => {
  const tutorial = require("../controllers/tutorial.controller.js");

  var router = require("express").Router();

  // Create a new tutorial - Route
  router.post("/", tutorial.create);

  // Fetch all the records of tutorial -Route
  router.get("/", tutorial.findAll);

  // Fetch single record of tutorial - Route
  router.get("/:id", tutorial.findOne);

  // Update record of tutorial - Route
  router.put("/:id", tutorial.updateById);

  // Delete record of tutorial - Route
  router.delete("/:id", tutorial.delete);

  app.use("/api/tutorials", router);
}