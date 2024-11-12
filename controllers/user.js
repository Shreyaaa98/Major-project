const User= require("../models/user.js");

module.exports.rendersignup=(req,res)=>{
    res.render("users/signup.ejs");
 };

 module.exports.signup=async(req,res)=>{
    try{
        let {username,email,password}=req.body;
        const user1 = new User({
            email:email,
            username:username
        });
        const newUser= await User.register(user1,password);
        console.log(newUser);
        req.login(newUser,(err)=>{
            if(err){
                next(err);
            }
            req.flash("success","Welcome to wanderlust");
            res.redirect("/listings");
        });
    }
    catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }

};

module.exports.renderlogin=(req,res)=>{
    res.render("users/login.ejs");
};

module.exports.login= async(req,res)=>{
    req.flash("success","Welcome back to Wanderlust");
    const redirectUrl =res.locals.redirectUrl||'/listings';
    res.redirect(redirectUrl);

};

module.exports.logout=(req,res)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","you logged out successfully");
        res.redirect("/listings");
    })
};
