// This is the Express Router for the  Server Page
const express=require("express"); // Express is required.
const router=express.Router();  // Router object created from the express router so that it can direct to the main js file when called.

router.get("/",(req,res)=>{
    res.send("get for User ");
})

// Show Route;
router.get("/:id/show",(req,res)=>{
    res.send("Show for User ");
})

// Edit Route:
router.post("/:id/Edit",(req,res)=>{
    res.send("Edit route");
})

// Delete Route:
router.delete("/:id",(req,res)=>{
    res.send("Delete for User.");
})

module.exports=router;