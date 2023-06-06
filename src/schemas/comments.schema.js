import joi from 'joi';

const commentSchema = joi.object({
  description: joi
    .string()
    .max(200)
    .required(),
});

export default commentSchema;
