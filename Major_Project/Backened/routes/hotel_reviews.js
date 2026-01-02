const express=require("express");
const router=express.Router();

const { name } = require("ejs");
const methodOverride=require('method-override');
const ejsMate=require("ejs-mate");
const ExpressError = require("../ExpressError");     // ExpressError
const wrapAsync = require("../utils/Wrapfunc");         // for Wrap Function
const validateSchema = require("../Schema_Validation"); // For Schema Validation
const { isLoggedIn, isauthor } = require("../middleware");
const { error } = require("console");

const review_controller = require("../Controller/Review_route_controller");
// Review Route:
router.post("/:id/reviews" ,isLoggedIn,review_controller.review_add);

// Review Delete
router.delete("/:list_id/reviews/:rev_id",isLoggedIn,isauthor,review_controller.delete_review);
module.exports=router;