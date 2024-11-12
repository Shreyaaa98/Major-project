const Listing = require("../models/listing.js");

module.exports.index= async(req,res)=>{
    const lists = await Listing.find();
    res.render("listings/index.ejs",{lists});
 };

 module.exports.newForm =(req,res)=>{
    res.render("listings/new.ejs");
};

module.exports.showListing=async (req,res)=>{
    let {id} = req.params;
       let listing= await Listing.findById(id)
       .populate({
           path: 'reviews',
           populate: {
               path: 'author' // Assuming each review has a reference to an author // Replace with the correct model name for your user
           },
       })
       .populate("owner");

   

   // console.log(curUser._id);
   // console.log(listing.owner._id)
   if(!listing){
       req.flash("error","Listing you are requested for does not exist");
       res.redirect("/listings");
   }
   res.render("listings/show.ejs",{listing});
};

module.exports.newListing=async (req, res) => {
    let listing = req.body.Listing;
    let url = req.file.path;
    let filename=req.file.filename;
    console.log(url);
   
   const newListing = new Listing(listing);
   newListing.owner=req.user._id;
   newListing.image={filename,url};
   await newListing.save();
   req.flash("success","New listing generated");
    res.redirect("/listings");
};

module.exports.edit=async (req,res)=>{
    let {id} = req.params;
    let listing= await Listing.findById(id);
    if(!listing){
       req.flash("error","Listing you are requested for does not exist");
       res.redirect("/listings");
   }
   let originalurl = listing.image.url;
   originalurl.replace("upload","upload/h_200/w_200");


    res.render("listings/edit.ejs",{listing,originalurl});

};

module.exports.updateListing=async (req,res)=>{
 
    let {id} = req.params;
    let listing = req.body;
   
   
    await Listing.findByIdAndUpdate(id,{title:listing.title,description:listing.description,country:listing.country,location:listing.location,
 price:listing.price});

 if(req.file){
    let url=req.file.path;
    let filename= req.file.filename;
    Listing.image={filename,url};
    await Listing.save();
 }

 req.flash("success","Listing updated");
    res.redirect("/listings");
};


module.exports.deleteListing=async(req,res) =>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing deleted");
    res.redirect("/listings");
};