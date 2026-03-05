const Joi = require("joi");

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),

    price: Joi.number().min(0).required(),

    image: Joi.object({
      filename: Joi.string().default("listingimage"),
      url: Joi.string()
        .uri()
        .allow("")
        .default("https://i.redd.it/u4rz9lktr3mb1.jpg"),
    }).optional(),
  }).required(),
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().integer().min(1).max(5).required(),
    comment: Joi.string().required(),
  }).required(),
});
