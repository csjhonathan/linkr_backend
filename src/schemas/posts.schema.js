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
});

export default postSchema;
