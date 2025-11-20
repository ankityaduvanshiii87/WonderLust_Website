// const {Schema}=require("E:\\B.tech\\Delta5.0\\Major_Project\\Backened\\Model\\Reviews.js")

const { ref } = require("joi");
const mongoose=require("mongoose");
const {Schema}=mongoose;
const reviews=require("E:\\B.tech\\Delta5.0\\WonderLust_Website\\Major_Project\\Backened\\Model\\Reviews.js");
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
        url: {
          type: String,
          set: (url) => url && url.trim() !== " " ? url : 'https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGNhbXBpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60'
        }
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
        }]
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