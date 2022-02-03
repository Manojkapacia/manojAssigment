const express = require("express");
const controller = require ("../../../controller/user");
const router = express.Router();

// const addUser =router.post('/save', controller.addData);
// const getOneUser = route.get('/oneUser/:id', controller.getProfile)]
const loginData= router.post('/login',controller.loginData);
const addUser = require("./add-user");
const getUserList= require("./get-user");
const getOneUser = require("./get-user-profile");
const update = require("./update-user");
const deleteData = require("./delete-user");
module.exports = [addUser, getUserList,getOneUser,update,deleteData,loginData];