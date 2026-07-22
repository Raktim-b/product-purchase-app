const Joi = require("joi");

const categoryValidation = Joi.object({
  name: Joi.string().trim().min(3).required().messages({
    "string.empty": "Category name is required",
    "string.min": "Category name must be at least 3 characters",
    "any.required": "Category name is required",
  }),

  status: Joi.boolean().optional(),

  image: Joi.any().optional(),
});

module.exports = categoryValidation;