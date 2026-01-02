// const {Schema}=require("E:\\B.tech\\Delta5.0\\Major_Project\\Backened\\Model\\Reviews.js")

const { ref } = require("joi");
const mongoose=require("mongoose");
const {Schema}=mongoose;
const reviews=require("./Reviews.js");
const User=require("./user.js");
const { type } = require("../Schema_Validation");
const wonderSchema=mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        image: {
            url:String,
            filename:String
        },
        price:{
            type:Number,
            required:true
        },
        location:{
            type:String,
            required:true
        },
        country:{
            type:String,
            required:true
        },
        reviews:[{                 // defined the array so the reviews of the particular hotel is stored in the same.
            type:Schema.Types.ObjectId,
            ref:"review"
        }],
        owner:{
            type:Schema.Types.ObjectId,
            ref:"User"
        },
        geometry: {
         type: {
           type: String,
           enum: ["Point"],
           required: true
         },
         coordinates: {
           type: [Number], // [lng, lat]
           required: true
         }
       }
    }
)

wonderSchema.post("findOneAndDelete",async(hotel)=>{ // This is the moongoose middleware that will perform action when teh delelte of hotel from the lisitng take place.
                                                     // So that when we remove the entire hotel then the reviews related to that automatically deteted.
                                                     // "findOneAndDelete":When this function is triggered it return the hotel data which is being deleted.
    if(hotel){
        await reviews.deleteMany({_id: {$in:hotel.reviews}}); // _id:refers to the is of the review that is stored in the hotel.
    } 
})
const Listing=mongoose.model("Listing",wonderSchema);
module.exports=Listing;