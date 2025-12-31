const reviews=require("E:\\B.tech\\Delta5.0\\WonderLust_Website\\Major_Project\\Backened\\Model\\Reviews.js");
const Listing=require('E:\\B.tech\\Delta5.0\\WonderLust_Website\\Major_Project\\Backened\\Model\\hotel.js');
// Add Review Functionality
module.exports.review_add=async(req,res)=>{  // this route is telling that we have to go to the listing collection 
                                                    //where all the hotels are saved and then to the specific hotel having some id
                                                    // and in that to the reviews array to add the review and show. and this is happening on the
                                                    // show page of the hotel having the form which on submition we get the review.on the show page.
    let {id}=req.params;
    let hotel=await Listing.findById(id);
    let newReview=new reviews(req.body.review);
    newReview.author=req.user._id; // Here we are storing the id of author in the review.So that only author can make changes to the review.
    hotel.reviews.push(newReview);
    await newReview.save();
    await hotel.save();
    req.flash("success","Review Added Successfully!")
    res.redirect(`/home/${id}/show`)
}

// delete Review Functionality
module.exports.delete_review=async(req,res)=>{ // used to delete the review.we have to specify the listing id and review id 
                                                                  // with different variable to avoid conflict.If the id variable is same
                                                                  // then JavaScript assume it it as one.
    let {list_id,rev_id}=req.params;
    await reviews.findByIdAndDelete(rev_id);
    await Listing.findByIdAndUpdate(list_id   ,{$pull:{reviews:rev_id}}); // As we are removing the specific review is of the hotel in that case we 

    req.flash("success","Review Deleted Successfully!")
    res.redirect(`/home/${list_id}/show`);// we will pull that review and update the hotel(listing).;
}