// State:It is the status of Information about the previos communication established by the client with the server.
// Session:It refers to the communication established b.w client and server.(1 communication == 1 session).
//    They are of two type:
    //   1.Statefull Protocol:In this we have to store the previous information of the Client session.(ftp)
    //   2.Stateless Protocol:In this we donot store the previous information of the client session.(http)

// Express session:express-session is a middleware library in Express.js used to create and manage user sessions.
//                This process of Storing the session is done by the Express.As it store the information on the server and 
//                create the unique id called Session-id and stored in teh form of cookies on teh browser.And required the browser
//                send this session id to the server and server will give the related information.
            
//                why:
//                 1.We have to track the user activity So that when user move from one page to another 
//                   page the information of the previous page doenot get deleted and when user return back to the 
//                   same page it he/she can excess the same info.(adding something to the cart and move to another page 
//                   and when you come back the page the cart info should remain).That'swhy we use  Express Sessions.
                 
//                 2.We use cookies to store the session ID because cookies store very small data, are saved in the browser, 
//                   and allow faster access without permanently storing session data in the database. 

// Connect-Flash:It is the middleware that is used with session to store and  display the message 
//               and remove after they are displayed once. It is majorily used for Authentications.
//                It takes  key and values as input.

const express=require("express")
const app=express()
const port=3000;
const path=require('path')

app.set("view engine","ejs");  // view Ejs file
app.set("views",path.join(__dirname,"/views"))

const flash=require('connect-flash'); // Required the Flash
var session = require('express-session') // Requied the session to create the Session.
const sessionOption=({secret: 'keyboard cat', // Create the session optios
      resave: false,
      saveUninitialized: true,
})

app.use(session(sessionOption)) // Used the Session .
app.use(flash())  // Used the Flash
// app.get("/recount",(req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }
//     else{
//         req.session.count=1;
//     }
//     res.send(`The count is ${req.session.count}`);
// })


app.use((req,res,next)=>{   // Used the middleware for flash messages.
    res.locals.msg=req.flash("sucess")  // Use to write multiple error message.
    res.locals.error=req.flash("error")
    next();
})

app.get("/register",(req,res)=>{   // Here we are Storing the information at the server 
    let {name="anonymous"}=req.query;
    req.session.name=name;
    if(name === "anonymous"){
        req.flash("error","User Not Registered!");
    }
    else{
        req.flash("sucess","User Registered Successfully!"); // Created the Flash message.
    }
    res.redirect("/hello"); 
})

app.get("/hello",(req,res)=>{ // Here we are using the information .
    res.render("page.ejs" , {name:req.session.name});
})

app.listen(port,()=>{
    console.log(`Listening at port ${port}`)
})