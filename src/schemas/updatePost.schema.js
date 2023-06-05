import joi from 'joi';

const updateSchema = joi.object({
  description: joi
    .string()
    .max(200)
    .required(),
});

export default updateSchema;
