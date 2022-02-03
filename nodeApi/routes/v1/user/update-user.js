 const express = require("express");
 const controller = require('../../../controller/user');
const router = express.Router()

router.put('/update', controller.updateData);

module.exports = router