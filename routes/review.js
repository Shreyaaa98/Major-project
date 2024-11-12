const express = require("express");
const router=express.Router({mergeParams:true});
const { reviewSchema }=require("./schema.js");
const wrapAsync=require("../utils/wrapAsync.js")
const Review = require("../models/review.js");
const ExpressError = require("../utils/Expresserror.js");
const Listing = require("../models/listing.js");
const {loggedIn }= require("../middleware.js");
const controller = require("../controllers/review.js");


const validateReview=(req,res,next)=>{
    let {error}= reviewSchema.validate(req.body);
    if(error){
        throw new ExpressError(404,error); 
    }
    else{
        next();
    }
}

//update review route
router.post("/",loggedIn ,validateReview,wrapAsync(controller.createReview));

//delete reviews
router.delete("/:reviewid",loggedIn,wrapAsync(controller.deleteReview));

module.exports=router;