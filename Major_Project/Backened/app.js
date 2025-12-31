if(process.env.NODE_ENV !="production"){
    require('dotenv').config()
}

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

// For Local Password Authentication.
const passport=require("passport");
const LocalStrtegy=require("passport-local");
const User=require("E:\\B.tech\\Delta5.0\\WonderLust_Website\\Major_Project\\Backened\\Model\\user.js")


// For Session
const session=require("express-session");
const flash=require("connect-flash");


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


// ---------------------------------------------------------------------------------------------------------------------------------------------------------
// Express Sessions and connect-flash
// Cookies:They store the session id and token for the given maxAge till then you need not to login and all
//          the request you made is done by the that sesion only.They donot store the username and password.
const sessionOption=({
    secret:"keyboad cat",
    resave:false,
    saveUninitialized: true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,  // At time the cookie will delete from the browser.
        maxAge:7*24*60*60*1000,             // After How much time the cookie will delete from the browser.
        httpOnly:true                      //HttpOnly cookies cannot be accessed by JavaScript and are only sent via HTTP requests, protecting session data from XSS attacks.
    }
})
app.use(session(sessionOption));
app.use(flash())
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Implementing Authentication: Always require the session to implement.
app.use(passport.initialize());  // Initializing the Passport and adding authenticated methods to request.
app.use(passport.session());     // Created to the session So that when user move form one page to another he/she will not relogin him slef
passport.use(new LocalStrtegy(User.authenticate()))  // Telling which authenication startegy we are going to use

passport.serializeUser(User.serializeUser());   // adding the user inofrmation to the session
passport.deserializeUser(User.deserializeUser()); // Deleting the user information from the session after longout.

// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser=req.user;
    next();
})
// ---------------------------------------Routes-------------------------------------------------------

//Listing_Routes:
const listing_hotels=require("E:\\B.tech\\Delta5.0\\WonderLust_Website\\Major_Project\\Backened\\routes\\listing_hotel.js");
app.use("/home",listing_hotels);

// Hotel_reviews_Routes:
const reviews_routes=require("E:\\B.tech\\Delta5.0\\WonderLust_Website\\Major_Project\\Backened\\routes\\hotel_reviews.js");
app.use("/listing",reviews_routes);

// User_Routes:
const User_Routes=require("E:\\B.tech\\Delta5.0\\WonderLust_Website\\Major_Project\\Backened\\routes\\user.js");
app.use("/home",User_Routes)
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Starting  the server.
app.listen(port,()=>{
    console.log(`Listenning at port ${port}`)
})
// --------------------------------------Middlewares------------------------------------------------------------------
app.all(/.*/,(req,res,next)=>{     // It is handling that if you are requested for wrong pathwhich you have not 
                                   //  defined then it will show error.
    next(new ExpressError(404, "Page Not Found"));
})

app.use((err, req, res, next) => {
    const { status = 500, message = "Something went wrong" } = err;
    const extra = "Please try again!";

    res.status(status).render("listing/error.ejs", {
        error: { message },
        extra
    });
});
