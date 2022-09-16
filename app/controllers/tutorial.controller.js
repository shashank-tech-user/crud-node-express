const Tutorial = require("../models/tutorial.model.js");
const uuid = require("uuid");

exports.create = (req, res) => {
  // Validate the req data
  if(req.body.title === "" || req.body.description === "") {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create tutorial object
  const tutorial = new Tutorial({
    id: uuid.v4(),
    title: req.body.title,
    description: req.body.description,
    published: req.body.published,
    created_at: new Date(),
    updated_at: new Date()
  });

  Tutorial.create(tutorial, (err, result) => {
    if(err){
      res.status(500).send({
        error: true,
        message: err.message || "Some error occured, please try again"
      });
      return;
    }
    res.status(200).send({
      error: false,
      message: "Tutorial added successfully",
      data: result
    });
  });
}

exports.findOne = (req, res) => {
  Tutorial.findById((req.params.id).trim(), (err, result) => {
    if(err) {
      res.status(400).send({
        error: true,
        message: "Getting error while retriving tutorial"
      });
      return;
    }

    if(result.length === 0) {
      res.status(404).send({
        error: true,
        message: `Tutorial not found on ${(req.params.id).trim()}`
      });
      return;
    } 
    res.status(200).send({
      error: false,
      message: "Fetch tutorial successfully",
      data: result[0]
    });
    return;
  });
}

exports.findAll = (req, res) => {
  Tutorial.findAll((err, result) => {
    if(err) {
      res.status(400).send({
        error: true,
        message: "Getting error while fetch tutorials"
      });
      return;
    }
    res.status(200).send({
      error: false,
      message: "Fetch all tutorials successfully",
      data: result
    });
    return;
  });
}

exports.updateById = (req, res) => {
  if(req.body.title === "" || req.body.description === "") {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const tutorial = new Tutorial({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published,
    updated_at: new Date()
  });

  Tutorial.updateById((req.params.id).trim(), tutorial, (err, result) => {
    if(err) {
      res.status(400).send({
        error: true,
        message: "Getting error while update tutorial details"
      });
      return;
    }

    if(result.error){
      res.status(500).send({
        error: true,
        message: result.message
      });
      return;
    }

    res.status(200).send({
      error: false,
      message: "Tutorial updated successfully!",
      data: result
    });
    return;
  });
}

exports.delete = (req, res) => {
  Tutorial.deleteById((req.params.id).trim(), (err, result) => {
    if(err) {
      res.status(400).send({
        error: true,
        message: "Getting error while deleting tutorial!",
      })
    }

    if(result.error){
      res.status(500).send({
        error: true,
        message: result.message
      });
      return;
    }

    res.status(200).send({
      error: false,
      message: "Tutorial deleted successfully",
      data: result
    })
  });
}
