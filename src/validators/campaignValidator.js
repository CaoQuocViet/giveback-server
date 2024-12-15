const Joi = require('joi');

const validateEditCampaign = (data) => {
  const schema = Joi.object({
    status: Joi.string()
      .valid('STARTING', 'ONGOING', 'CLOSED', 'COMPLETED')
      .required(),
      
    endDate: Joi.date()
      .greater('now')
      .required(),
      
    targetAmount: Joi.number()
      .positive()
      .required(),
      
    description: Joi.string()
      .min(10)
      .max(5000)
      .required(),
      
    detailGoal: Joi.string()
      .min(10)
      .max(5000)
      .required(),
      
    images: Joi.string()
      .required()
  });

  return schema.validate(data);
};

module.exports = {
  validateEditCampaign
}; 