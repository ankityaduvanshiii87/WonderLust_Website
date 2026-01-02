const express = require("express");
const path=require("path");
const router=express.Router({mergeParams:true});

const { name } = require("ejs");
const methodOverride=require('method-override');
const ejsMate=require("ejs-mate");
const ExpressError=require("../ExpressError.js")         // ExpressError
const wrapAsync=require("../utils/Wrapfunc.js");         // for Wrap Function
const validateSchema=require("../Schema_Validation.js"); // For Schema Validation
const { error } = require("console");
const {isLoggedIn,validatedSchema,isOwner}=require("../middleware.js")
router.use(express.urlencoded({ extended: true }));
router.use(express.static(path.join(__dirname,"/public")));
const multer=require("multer"); // Used to parse the file data from the form.

// Requireing the CLoudinary configuration and storage.
const {storage}=require("../cloudConfig")
const upload=multer({storage})  // create the uploads folder and store the files.


const Listing=require("../Model/hotel");
const listing_controller = require("../Controller/listing_hotels");




// home Page
router.get("/", wrapAsync(listing_controller.home));

// Add Button  
router.get("/add",isLoggedIn,listing_controller.add_get_form); // Getting the Add form

router.post(   // Storing the data in the database
  "/listing/Apna_home",
  isLoggedIn,
  upload.single("listing[image]"), // ✅ MULTER HERE
  wrapAsync(listing_controller.add_post),
);

// Show Route
router.get("/:id/show" ,isLoggedIn,wrapAsync(listing_controller.show));

//Edit route
router.get("/:id/update",isOwner,isLoggedIn,wrapAsync(listing_controller.edit_get_form));


router
    .route("/:id")
    .patch(isLoggedIn,isOwner,upload.single("listing[image]"),wrapAsync(listing_controller.edit_post))  // edit path 
    .delete(isOwner,isLoggedIn,wrapAsync(listing_controller.delete));// destroy Path

module.exports=router