const Review= require("../models/review.js");
const Listing= require("../models/listing.js");

module.exports.createReview=async(req,res)=>{
    let {id}=req.params;
    let listing = await Listing.findById(id);
    let list=req.body.review;
    let review1 = new Review(list);
    review1.author=res.locals.curUser._id;
    listing.reviews.push(review1);
    await review1.save();
    await listing.save();
    req.flash("success","New review generated");
    res.redirect(`/listings/${id}`);
    
};


module.exports.deleteReview=async(req,res)=>{
    let {id,reviewid} = req.params;
    let review=await Review.findById(reviewid);
    if(review.author){
        if(review.author .equals (res.locals.curUser._id)){
            await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewid}});
        await Review.deleteOne({_id:reviewid});
        req.flash("success","review deleted");
        res.redirect(`/listings/${id}`);
}
else{
    req.flash("error","You are not the owner of the review");
    res.redirect(`/listings/${id}`);
}
}
};