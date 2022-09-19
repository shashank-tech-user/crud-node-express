/**
 * Import express and cors packages.
 * Express helps to create rest API.
 * cord provides Express middleware to enable CORS with multiple options
 * Added Two body parser: 1). JSON and 2). urlencoded
 */


require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
}

app.use(cors(corsOptions));

app.use(fileUpload());

/**
 * content-type: application/json
 */
app.use(express.json());

/**
 * content-type: application/x-www-urlencoded
 */
app.use(express.urlencoded({ extended: true }));

/**
 * Set host port to run project
 */
require("./app/routes/tutorial.route.js")(app);
require("./app/routes/auth.route.js")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
})
