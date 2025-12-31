const express=require("express");
const router=express.Router();

const { name } = require("ejs");
const methodOverride=require('method-override');
const ejsMate=require("ejs-mate");
const ExpressError=require("E:\\B.tech\\Delta5.0\\WonderLust_Website\\Major_Project\\Backened\\ExpressError.js")         // ExpressError
const wrapAsync=require("E:\\B.tech\\Delta5.0\\WonderLust_Website\\Major_Project\\Backened\\utils\\Wrapfunc.js");         // for Wrap Function
const validateSchema=require("E:\\B.tech\\Delta5.0\\WonderLust_Website\\Major_Project\\Backened\\Schema_Validation.js"); // For Schema Validation
const {isLoggedIn,isauthor}=require("E:\\B.tech\\Delta5.0\\WonderLust_Website\\Major_Project\\Backened\\middleware.js")
const { error } = require("console");

const review_controller=require("E:\\B.tech\\Delta5.0\\WonderLust_Website\\Major_Project\\Backened\\Controller\\Review_route_controller.js")
// Review Route:
router.post("/:id/reviews" ,isLoggedIn,review_controller.review_add);

// Review Delete
router.delete("/:list_id/reviews/:rev_id",isLoggedIn,isauthor,review_controller.delete_review);
module.exports=router;