const mongoose=require("mongoose");
const { type } = require("../Schema_Validation");
const {Schema}=mongoose
const User=require("E:\\B.tech\\Delta5.0\\WonderLust_Website\\Major_Project\\Backened\\Model\\user.js");

const review_Schema=mongoose.Schema(
    {
        Comment:{
            type:String,
            required:true
        },
        Rating:{
            type:Number,
            required:true
        },
        author:{
            type:Schema.Types.ObjectId,
            ref:"User"
        }
    }
)

const review=mongoose.model("review",review_Schema);
module.exports=review;
