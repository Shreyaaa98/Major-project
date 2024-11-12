const express = require("express");
const router=express.Router();
const User= require("../models/user.js");
const wrapAsync=require("../utils/wrapAsync.js");
const passport = require("passport");
const {saveredirectUrl}= require("../middleware.js");
const controller = require("../controllers/user.js");


router.route("/signup")

.get(controller.rendersignup)

.post(wrapAsync(controller.signup));


router.route("/login")

.get(controller.renderlogin)


.post(
    saveredirectUrl,
    passport.authenticate("local",
        {
            failureRedirect:"/login",
            failureFlash:true,
        }
    ),
   controller.login);

router.get("/logout",controller.logout);
module.exports=router;