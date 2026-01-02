const express=require("express");
const router=express.Router({mergeParams:true});

const { name } = require("ejs");
const methodOverride=require('method-override');
const ejsMate=require("ejs-mate");
const ExpressError=require("E:\\B.tech\\Delta5.0\\WonderLust_Website\\Major_Project\\Backened\\ExpressError.js")         // ExpressError
const wrapAsync=require("E:\\B.tech\\Delta5.0\\WonderLust_Website\\Major_Project\\Backened\\utils\\Wrapfunc.js");         // for Wrap Function
const validateSchema=require("E:\\B.tech\\Delta5.0\\WonderLust_Website\\Major_Project\\Backened\\Schema_Validation.js"); // For Schema Validation
const { error, log } = require("console");
const {isLoggedIn, saveRedirectUrl}=require("E:\\B.tech\\Delta5.0\\WonderLust_Website\\Major_Project\\Backened\\middleware.js")
router.use(express.urlencoded({ extended: true }));
const passport = require("passport");
const User_controller=require("../Controller/User_route_controller.js")

// Adding the new User to the DataBase. 
router
    .route("/SignUp")
    .get(User_controller.add_newUser_getForm) // Sign up form  
    .post(User_controller.add_newUser_post);  // Store the data in the database.


router
     .route("/Login")
     .get(User_controller.existing_user_getform) // login get form
     .post(
            saveRedirectUrl,   // calling the local so that the url should not get deleted after the authenticate function is called.
            passport.authenticate(
                "local",
                {failureRedirect:"/home/Login",failureFlash:true}
            ),
                User_controller.User_Authentication
            );

// Logout user:
router.get("/Logout",isLoggedIn,User_controller.User_Logout);

module.exports=router;