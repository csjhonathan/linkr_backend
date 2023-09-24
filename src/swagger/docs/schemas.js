/* eslint-disable import/prefer-default-export */
import { createPostSchema, postSchema, updatePostSchema } from './post/schemas.js';
import { signInSchema, signUpSchema } from './user/schemas.js';

export const schemas = {
  SignUp: signUpSchema,
  SignIn: signInSchema,
  CreatePost: createPostSchema,
  UpdatePost: updatePostSchema,
  Post: postSchema,
};
