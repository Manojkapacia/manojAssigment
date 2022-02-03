const express = require ("express");
const SERVICE = require ("../service/users");
const app = express();
const {verifyToken} = require("../utilities/jwt-helper")

module.exports.addData = async (req,res) => {
    let payload = req.body;
    try{
        const result = await SERVICE.addData(payload);
        res.status(200).json({status: result.status, success:result.success, 
          message:result.message, data:result.data});
    } catch(error){
        console.log(error);
        res.status(400).json({status: 400, success:false, 
          message:"Server Error", data:{}});
    }
}

module.exports.getData = async(req, res)=>{
    try{
        console.log(req.user);
        const result = await SERVICE.getData();
            res.status(200).json({status:result.status,success:result.success,
              message : result.message, data : result.data});
        } catch(error){
            console.log(error);
            res.status(400).json({status : 400,success:false,
               message : "Server Error", data: []});
        }
}

module.exports.getProfile = async(req,res)=>{
    let userId = req.params.id;
    //console.log(userId);
    try{
        const result =await SERVICE.getProfile(userId);
        res.status(200).json({status: result.status,success:result.success, 
          message : result.message, data : result.data});
    } catch (error){
        console.log(error);
        res.status(400).json({status: 400,success:false, message: "error", data: []});
    }
}

module.exports.updateData = async (req, res) => {
    let payload = req.body;
    try {
      const result = await SERVICE.updateData(payload);
      res.status(200).json({status: result.status,success:result.success, 
        message: result.message, data: result});
    } catch (error) {
      console.log(error)
      res.status(400).json({status: 400,success:false, message: 'Error', data: {}});
    }
  };

  module.exports.deleteUser = async (req, res) => {
    let userId = req.params.id;
    try {
      const result = await SERVICE.deleteUser(userId);
      res.status(200).json({status: result.status, message: result.message,
        success: result.success, data: {}});
    } catch (error) {
      console.log(error)
      res.status(400).json({status: 400,success:false, message: 'Error', data: {}});
    }
  };

  module.exports.loginData = async(req,res)=>{
    let payloadData = req.body;
    //console.log(payloadData);
    try{
      const result = await SERVICE.loginData(payloadData);
      res.status(200).json({status:result.status,message:result.message,
        success:result.success, data:result.data});
    }catch(error){
      console.log(error);
      res.status(400).json({status:400,message:"error",data:{}});
    }
  }