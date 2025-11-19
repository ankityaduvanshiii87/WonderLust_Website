const joi=require('joi');
const Schema=joi.object({
        listing:joi.object({
                title: joi.string().pattern(/^[A-Za-z\s]+$/).strict().required(),
                price: joi.number().required(),
                description: joi.string().required(),
                location: joi.string().required(),
                country: joi.string().required(),
                image: joi.string().allow("",null)
        }).required()
});
        
module.exports=Schema;