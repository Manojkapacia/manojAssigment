const controller = require('../../../controller/user');
const express = require('express')
const router = express.Router()

router.delete('/delete/:id', controller.deleteUser);

module.exports = router