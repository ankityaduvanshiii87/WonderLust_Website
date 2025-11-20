const mongoose=require("mongoose");

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/WonderLust");;
}
main()
.then((res,err)=>{
    if(err) throw err;
    console.log("Database Connected Successfully....")
})
.catch((err)=>{
    console.log(err);
})

// Express 
const express=require('express');
const app=express();
const port=3000;
const path=require("path");
const { name } = require("ejs");
const methodOverride=require('method-override');
const ejsMate=require("ejs-mate");                       // ejsmate

// Note:I have already required all these library inside their the respectice modules(listing,reviews);
const ExpressError=require("./ExpressError.js")         // ExpressError
const wrapAsync=require("./utils/Wrapfunc.js");         // for Wrap Function
const validateSchema=require("./Schema_Validation.js"); // For Schema Validation
const { error } = require("console");


app.use(methodOverride('_method'));
app.engine("ejs",ejsMate);
app.set("view engine","ejs");  // view Ejs file
app.set("views",path.join(__dirname,"/views"))
app.use(express.static(path.join(__dirname,"/public"))); // for applying the css and Js form public folder

// Note:I have already required all these library inside their the respectice modules(listing,reviews);
app.use(express.urlencoded({extended:true}));
app.use(express.urlencoded({ extended: true }));  // for parsing the from input
app.use(express.json());
app.use(express.static(path.join(__dirname,"/")))




// Starting  the server.
app.listen(port,()=>{
    console.log(`Listenning at port ${port}`)
})

// ---------------------------------------Routes-------------------------------------------------------

//Listing_Routes:
const listing_hotels=require("E:\\B.tech\\Delta5.0\\WonderLust_Website\\Major_Project\\Backened\\routes\\listing_hotel.js");
app.use("/home",listing_hotels);

// Hotel_reviews_Routes:
const reviews_routes=require("E:\\B.tech\\Delta5.0\\WonderLust_Website\\Major_Project\\Backened\\routes\\hotel_reviews.js");
app.use("/listing",reviews_routes);

// --------------------------------------Middlewares------------------------------------------------------------------
app.all(/.*/,(req,res,next)=>{     // It is handling that if you are requested for wrong pathwhich you have not 
                                   //  defined then it will show error.
    let message="page Not Found!" 
    res.render("listing/error.ejs",{message})
})

app.use((error,req,res,next)=>{   // By default it is applied to all the path if any error occurred.
    let {status=500,message="Some Error"}=error;
    let extra='Please try again';
    res.render("listing/error.ejs",{error,extra});
})