const Listing = require("./models/listing.js");

module.exports.loggedIn= (req,res,next)=>{
    if(!req.isAuthenticated()){
    req.session.redirectUrl = req.originalUrl;
req.flash("error","you must be logged in");
return res.redirect("/login");
}
next();
}

module.exports.saveredirectUrl =(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
    
}

module.exports.isPermission=async(req,res,next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id .equals (res.locals.curUser._id)){
        req.flash("error","you are not the owner of listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
}