exports.validations = (modelName) => `const Joi = require('joi');

exports.${modelName}Validations = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().min(6).max(50),
    description: Joi.string().required().min(6).max(255),
    validation: Joi.boolean(),
  });

  return schema.validate(data);
};
`;
