const express = require("express");
const controller = require ("../../../controller/user");
const router = express.Router();

router.post('/save', controller.addData);


module.exports= router;