const Joi= require("joi");
listSchema=Joi.object({
    Listing:Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        location:Joi.string().required(),
        country:Joi.string().required(),
        price:Joi.string().required(),
        image:Joi.string().allow("",null),


    }).required(),
});

reviewSchema=Joi.object({
   review:Joi.object({
        rating:Joi.number().required().min(1).max(5),
        comments:Joi.string().required(),
    }).required(),
});

module.exports={listSchema,reviewSchema};




