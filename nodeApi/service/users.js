const mongoose = require("mongoose");
const USER = require ("../collection/user/db-schema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { findOne } = require("../collection/user/db-schema");

module.exports.addData = async (payloadData) => {    
    const salt = await bcrypt.genSalt(10)
    payloadData.password = await bcrypt.hash(payloadData.password, salt);
    const user = new USER(payloadData);   
    const userSaved = await user.save();

    if(userSaved) {
        return  {
            status: 200,
            success: true,
            message: 'User registered successsffully',
            data: {}
        }
    } else {
        return  {
            status: 200,
            success: false,
            message: 'Server Error, plase try again',
            data: {}
        }
    }
}

module.exports.getData= async() =>{
    const allUser =await USER.find({is_deleted:false});
    if(allUser.length>=1){
        return {
            status: 200,
            success:true,
            message:"Data fatch successfully",
            data:allUser
        }
    }
       
    else{
        return{
            status:200,
            success: false,
            message:"Server Error Please try again",
            data:{}
        }
    }
}

module.exports.getProfile = async(userId) =>{
    //console.log(userId);
    const oneUser = await USER.findOne({_id :mongoose.Types.ObjectId(userId)});
    if(oneUser){
        return{
            status:200,
            success:true,
            message:"Data fatch successfuly",
            data:{oneUser}
        }
    }else{
        return{
            status:200,
            success:false,
            message:"Server Error",
            data: {}
        }
    }
}

module.exports.updateData= async (payloadData)=>{
    const updateUser= await USER.findByIdAndUpdate(payloadData.id,{
        $set : {
            name : payloadData.name,
            email: payloadData.email,
            number: payloadData.number
        }
    },{ new: true});
    if(updateUser){
        return{
            status:200,
            message:"Data update successfull",
            success:true,
            data:{updateUser}
        }
    }else{
        return{
            status:200,
            message:"Server Error",
            success:false,
            data:{}
        }
    }
    
}

module.exports.deleteUser = async(userId) => {
    const deletedUser = await USER.findByIdAndUpdate(userId, {
        $set: {
            is_deleted: true
        }
    });
   // console.log(deletedUser);
   if(deletedUser){
       return{
           status:200,
           success:true,
           message:"Data deleted successfully",
           data:{}
       }
   }
   else{
       return{
           status:200,
           success:false,
           message:"Something went wrong",
           data:{}
       }
   }
}

module.exports.loginData = async(payloadData)=>{
    const userData= await USER.findOne({email:payloadData.email});
    if(!userData){
        return{
            status:200,
            message:'Email not found',
            success:false,
            data:{}
        }
    }

   const isPwdMatched =  await bcrypt.compare(payloadData.password, userData.password)

    if(isPwdMatched){
        // creating json web token
        const token = jwt.sign(
            { userId: userData._id, email: userData.email },
            'MY_JSON_TOEKN_KEY_2022'
        );

        const dataToSend = {
            token: token, 
            id: userData._id,
            email: userData.email
        }

        return{
            status:200,
            message:'login in successfully',
            success:true,
            data:dataToSend
        }
    }else{
        return{
            status:200,
            message:'Password not matched',
            success:false,
            data:{}
        }
    }
}