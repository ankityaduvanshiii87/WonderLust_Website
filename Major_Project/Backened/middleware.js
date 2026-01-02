const { authenticate } = require("passport");
const Listing = require("./Model/hotel.js");
const reviews=require("./Model/Reviews.js");
const validateSchema=require("./Schema_Validation.js");

module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){  // It is the method  to authenicate the user 
        req.session.redirecUrl=req.originalUrl;   // Saving the original Url where you want to go.
        req.flash("error","You Must be Logged in.");
        return res.redirect("/home/Login");  
    }
    next();
}

// As we know that after the passport authenticate the session extra information(requested URL,flash messages,previous path   ) is delete so we have stored
// that value into the local variable.So that we can have excess to the original path information.  
module.exports.saveRedirectUrl=(req,res,next)=>{
    res.locals.redirectUrl=req.session.redirecUrl;
    next();
}

// Middleware to validate the Schema.
module.exports.validatedSchema = (req, res, next) => {
  const { error } = validateSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(",");
    throw new ExpressError(400, msg);   // throws if not string
  } else {
    next();
  }
};

//  Middleware for Listing Authorization.
module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;

    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/home");
    }

    if (!listing.owner.equals(req.user._id)) { // here we are comparing the current user id with the owner id of the listing.if they are same then only we can delete and edit the listing.
        req.flash("error", "You do not have permission");
        return res.redirect(`/home/${id}/show`);
    }
    next();
};

// Middleware for the Review Authentication.
module.exports.isauthor = async (req, res, next) => {
    let {list_id,rev_id}=req.params;
    const review = await reviews.findById(rev_id);
    if (!review) {
        req.flash("error", "Listing not found");
        return res.redirect("/home");
    }
    if (!review.author.equals(req.user._id)) {  // here we are comparing the current user id with the author id of the review.if they are same then only we can delete the review.
        req.flash("error", "Only the Author can Delete it! ");
        return res.redirect(`/home/${list_id}/show`);
    }
    next();
};

