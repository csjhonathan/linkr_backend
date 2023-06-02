import joi from 'joi';

const postSchema = joi.object({
  url: joi
    .string()
    .uri(),
  description: joi
    .string()
    .max(200),
  createdAt: joi
    .date()
    .timestamp()
    .required(),
  userId: joi
    .number()
    .required(),
});

export default postSchema;
