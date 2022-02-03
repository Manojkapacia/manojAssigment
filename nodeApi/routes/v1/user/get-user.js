const express = require ("express"); 
const controller = require("../../../controller/user");
const route = express.Router();
const {verifyToken} = require("../../../utilities/jwt-helper")

route.get('/list', verifyToken, controller.getData);

module.exports= route;