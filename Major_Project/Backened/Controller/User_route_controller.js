const User=require("E:\\B.tech\\Delta5.0\\WonderLust_Website\\Major_Project\\Backened\\Model\\user.js");
const passport = require("passport");
// # get SignUp form Functionality:
module.exports.add_newUser_getForm=async(req,res)=>{
    res.render("E:\\B.tech\\Delta5.0\\WonderLust_Website\\Major_Project\\Backened\\views\\User\\SignUp.ejs")
}

// # post(add the User to DataBase) SignUp form Functionality:
module.exports.add_newUser_post=async(req,res)=>{
    try{
        let{FristName,LastName,email,username,password}=req.body;
        let newUser=new User({
            FristName,
            LastName,
            email,
            username,
        });
        req.flash("success","Registered Successfully!");
        let registerUser=await User.register(newUser,password);
        req.login(registerUser,(err)=>{   // This function is used for directly login after the signup without asking for the Login
            if(err){
                return next(err);
            }
            req.flash("success",`Hi! ${username}, Welcome to WonderLust.`);
            res.redirect("/home");
        })
    }
    catch(e){
        req.flash("error",e.message);
        res.redirect("/home/SignUp");
    }
}

// # get Login form Functionality:
module.exports.existing_user_getform=async(req,res)=>{
    res.render("E:\\B.tech\\Delta5.0\\WonderLust_Website\\Major_Project\\Backened\\views\\User\\Login.ejs")
}

// # User Authentication Functionality
module.exports.User_Authentication=async (req,res)=>{
            let{username}=req.body;
            req.flash("success",`Hi! ${username} You have Logged in Sucessfully.`);
            let redirectUrl=res.locals.redirectUrl ||"/home";  // if the orginialUrl is undefinned(you are directly logging in) then home page is redicted.
            res.redirect(redirectUrl);  // local saved url.
}

// # LogOut User Functionality
module.exports.User_Logout=(req,res,next)=>{
        req.logout((err)=>{    // It is the method in the passport that is used to logout the current user session.By using the serialiaze and deserialize.
        if(err){
            return next(err);
        }
        req.flash("success","You LogOut Successfully!");
        res.redirect("/home");
    })
}