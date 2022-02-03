const express = require("express");
const controller = require("../../../controller/user")
const route = express.Router();

route.get('/oneUser/:id', controller.getProfile);
module.exports= route;