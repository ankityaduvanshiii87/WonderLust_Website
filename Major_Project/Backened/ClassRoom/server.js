// Express Router:These are the class in the Express that help in the restructuring of the code.So that 
                // It doesnot get bulky in the main js file. 
// Cookies:These are the small chunk of Data that is stored in the Web Browser send by Server.
                // We have to pass the Name-value pair.
// cookie-Parser:This is the libraray that is used to access the cookie from the Web Browser. 
const express=require("express");
const app=express();
const port=3000;


const User=require("E:\\B.tech\\Delta5.0\\Major_Project\\Backened\\ClassRoom\\users.js") //required the users file
const Post=require("E:\\B.tech\\Delta5.0\\Major_Project\\Backened\\ClassRoom\\posts.js") //required the posts file
const cookieParser=require("cookie-parser");

app.listen(port,(req,res)=>{
    console.log("Server is listining to 3000")
})

app.use(cookieParser()); // this function is used to call the cookies.The cookies get stored in the browser after they are called.
app.get("/getcookies",(req,res)=>{
    res.cookie("greet","Good Morning ! Have a nice Day");
    res.cookie("MadeIn","India");
    res.send("Send you same Cookies");
})

//  Root Route:
app.get("/",(req,res)=>{
    console.log(req.cookies);
    res.send("Hii I am Root");
})

// User_Route
// Index Route;
app.use("/users", User); // When we make request which start from /users(common among all routes) then the router will 
                        // search for the same in the User file and match them and respond to it.

// Post_Routes:
app.use("/posts", Post);
