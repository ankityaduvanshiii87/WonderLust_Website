const express=require("express");
const router=express.Router();

const { name } = require("ejs");
const methodOverride=require('method-override');
const ejsMate=require("ejs-mate");
const ExpressError=require("E:\\B.tech\\Delta5.0\\Major_Project\\Backened\\ExpressError.js")         // ExpressError
const wrapAsync=require("E:\\B.tech\\Delta5.0\\Major_Project\\Backened\\utils\\Wrapfunc.js");         // for Wrap Function
const validateSchema=require("E:\\B.tech\\Delta5.0\\Major_Project\\Backened\\Schema_Validation.js"); // For Schema Validation
const { error } = require("console");

const Listing=require('E:\\B.tech\\Delta5.0\\Major_Project\\Backened\\Model\\hotel.js');
const reviews=require("E:\\B.tech\\Delta5.0\\Major_Project\\Backened\\Model\\Reviews.js");
// Review Route:
router.post("/:id/reviews" ,async(req,res)=>{  // this route is telling that we have to go to the listing collection 
                                                    //where all the hotels are saved and then to the specific hotel having some id
                                                    // and in that to the reviews array to add the review and show. and this is happening on the
                                                    // show page of the hotel having the form which on submition we get the review.on the show page.
    let {id}=req.params;
    let hotel=await Listing.findById(id);
    let newReview=new reviews(req.body.review);
    hotel.reviews.push(newReview);

    await newReview.save();
    await hotel.save();
    res.redirect(`/home/${id}/show`)
})

// Review Delete
router.delete("/:list_id/reviews/:rev_id",async(req,res)=>{ // used to delete the review.we have to specify the listing id and review id 
                                                                  // with different variable to avoid conflict.If the id variable is same
                                                                  // then JavaScript assume it it as one.
    let {list_id,rev_id}=req.params;
    await reviews.findByIdAndDelete(rev_id);
    await Listing.findByIdAndUpdate(list_id   ,{$pull:{reviews:rev_id}}); // As we are removing the specific review is of the hotel in that case we 
                                                                          // we will pull that review and update the hotel(listing).
    res.redirect(`/home/${list_id}/show`);

})
module.exports=router;