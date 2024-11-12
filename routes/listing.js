const express = require("express");
const router=express.Router();
const { listSchema }=require("./schema.js");
const wrapAsync=require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const Review= require("../models/review.js");
const ExpressError = require("../utils/Expresserror.js");
const {loggedIn ,isPermission}= require("../middleware.js");
const controller = require("../controllers/listing.js");
const multer  = require('multer');
const {storage}= require("../cloudConfig.js");
const upload = multer({ storage });




const validateError=(req,res,next)=>{
    let {error}= listSchema.validate(req.body);
    if(error){
        throw new ExpressError(404,error); 
    }
    else{
        next();
    }
}


router.route("/")
.get(wrapAsync(controller.index)) //index route
.post(loggedIn,upload.single('Listing[image]'),wrapAsync(controller.newListing));//post route



//new route
router.get("/new",loggedIn,controller.newForm);


router.route("/:id")
//show route
.get(wrapAsync(controller.showListing))
.put(loggedIn,upload.single('image'),wrapAsync(controller.updateListing))  //update route
.delete(loggedIn,wrapAsync(controller.deleteListing));  //delete route


 //edit route
 router.get("/:id/edit",loggedIn,isPermission,wrapAsync(controller.edit));
 
 
module.exports= router;