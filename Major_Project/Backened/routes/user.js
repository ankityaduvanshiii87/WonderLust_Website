const express=require("express");
const router=express.Router({mergeParams:true});

const { name } = require("ejs");
const methodOverride=require('method-override');
const ejsMate=require("ejs-mate");
const ExpressError = require("../ExpressError");     // ExpressError
const wrapAsync = require("../utils/Wrapfunc");         // for Wrap Function
const validateSchema = require("../Schema_Validation"); // For Schema Validation
const { isLoggedIn, saveRedirectUrl } = require("../middleware");
const { error, log } = require("console");
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