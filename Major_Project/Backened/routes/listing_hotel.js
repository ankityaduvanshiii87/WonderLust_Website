const express = require("express");
const router=express.Router({mergeParams:true});

const { name } = require("ejs");
const methodOverride=require('method-override');
const ejsMate=require("ejs-mate");
const ExpressError=require("E:\\B.tech\\Delta5.0\\Major_Project\\Backened\\ExpressError.js")         // ExpressError
const wrapAsync=require("E:\\B.tech\\Delta5.0\\Major_Project\\Backened\\utils\\Wrapfunc.js");         // for Wrap Function
const validateSchema=require("E:\\B.tech\\Delta5.0\\Major_Project\\Backened\\Schema_Validation.js"); // For Schema Validation
const { error } = require("console");

const Listing=require('E:\\B.tech\\Delta5.0\\Major_Project\\Backened\\Model\\hotel.js');

const validatedSchema = (req, res, next) => {
  const { error } = validateSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(",");
    throw new ExpressError(400, msg);   // throws if not string
  } else {
    next();
  }
};

// home Page
router.get("/", wrapAsync(async (req, res) => {
  const listing = await Listing.find({});
  res.render("listing/Apna_home.ejs", { listing });
}));

// Add Button  
router.get("/add",(req,res)=>{
    res.render("listing/Add.ejs");
})

router.post("listing/Apna_home",validatedSchema,wrapAsync(async(req,res)=>{
    let new_Listing=new Listing(req.body.listing);
    await new_Listing.save();
    res.redirect("/home");
}));

// Show Route
router.get("/:id/show",wrapAsync(async(req,res)=>{
    let{id}=req.params;
    const listing=await Listing.find().populate("reviews");
    for(hotel of listing){
        if(id==hotel.id){
            res.render("listing/show.ejs",{hotel});
        }
    }
}))

//Edit route
router.get("/:id/update",wrapAsync(async(req,res)=>{
    let{id}=req.params;
    const listing=await Listing.find();
    for(hotel of listing){
        if(id==hotel.id){
            res.render("listing/update.ejs",{hotel});
        }
    }
}))


router.patch("/:id",wrapAsync(async(req,res)=>{  // Patch request is used for updation .
    let{id}=req.params;
    let {price,description,location,country,title,image}=req.body;

    await Listing.findByIdAndUpdate(id,
        {price:price,
        description:description,
        location:location,
        country:country,
        title:title,
        image: { url: image }
        }
    )
    res.redirect(`/home/${id}/show`);
}));

// destroy Path
router.delete("/:id",wrapAsync(async(req,res)=>{
    let{id}=req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/home")
}))

module.exports=router