// This is the Express Router for the  Server Page
const express=require("express");
const router=express.Router();

// Index Route;
router.get("/",(req,res)=>{
    res.send("get for posts ");
})

// Show Route;
router.get("/:id/show",(req,res)=>{
    res.send("Show for posts");
})

// Edit Route:
router.post("/:id/Edit",(req,res)=>{
    res.send("Edit route");
})

// Delete Route:
router.delete("/:id",(req,res)=>{
    res.send("Delete for posts.");
})

module.exports=router;