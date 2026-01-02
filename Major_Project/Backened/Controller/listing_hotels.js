const Listing=require('../Model/hotel.js');
const { geocode } = require("../Services/geocoding.js");

// home Route
module.exports.home=(async (req, res) => {
  const listing = await Listing.find({});
  res.render("listing/Apna_home.ejs", { listing });
})

// add  form get Functionality:
module.exports.add_get_form=(req,res)=>{
    res.render("listing/Add.ejs");
}

// Add_post functioanlity:
module.exports.add_post=(async(req,res)=>{
    let new_Listing=new Listing(req.body.listing);

    // Adding the geocoding to get the location of the place on map.
    const coords = await geocode(req.body.listing.location);
    if (!coords) {
      req.flash("error", "Invalid location");
      return res.redirect("/home/add");
    }
    // Saving the cordinates
    new_Listing.geometry = {
      type: "Point",
      coordinates: [coords.lng, coords.lat]
    };

    new_Listing.owner=req.user._id;  // Adding the new Listing with the owner who have created it.by using the owner id from the req.users(passport).
    if (req.file) {     // Updating the image url and path in the database.(Asreq.file have all the info of the uploaded file)
        new_Listing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
    }
    await new_Listing.save();
    req.flash("success","New Listing Added Successfully!")
    res.redirect("/home");
})


module.exports.createListing = async (req, res) => {


  // save coords to DB
};

// Show Route Functionality:
module.exports.show=(async(req,res)=>{
    let{id}=req.params;
    const listing=await Listing.find().populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    
    if(!listing){
        req.flash("error","Listing Not Found!")
        res.redirect("/home")
    }
    for(hotel of listing){
        if(id==hotel.id){
            res.render("listing/show.ejs",{hotel});
        }
    }
})

// Edit form get  route Functionality:
module.exports.edit_get_form=(async(req,res)=>{
    let{id}=req.params;
    const listing=await Listing.find();
    for(hotel of listing){
        let original_image=hotel.image.url   // Here we are getting the url for the image that is already stored in dataBase
                                            //.So that we can display it on Edit page. 
        if(id==hotel.id){
            res.render("listing/update.ejs",{hotel,original_image});
        }
    }
})

// Edit Post(Update) route Functionallity:
module.exports.edit_post=(async(req,res)=>{  // Patch request is used for updation .
  const { id } = req.params;

  const Update_lisitng = await Listing.findByIdAndUpdate(id,{ ...req.body.listing });
    if (req.file) {    // Updating the image url and path in the database.
        Update_lisitng.image = {
            url: req.file.path,
            filename: req.file.filename
        };
        await Update_lisitng.save() // Again saving the listing.So that image get updated.
    }
    req.flash("success","Listing Updated Successfully!")
    res.redirect(`/home/${id}/show`);
})

// delete Route Funcionallity:
module.exports.delete=(async(req,res)=>{
    let{id}=req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted Successfully!")
    res.redirect("/home")
})