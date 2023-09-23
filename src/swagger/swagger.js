// eslint-disable import/prefer-default-export

import {
  createPostDoc, deletePostDoc, timelineDoc, userTimelineDoc, updatePostDoc,
} from './docs/post/post.docs.js';
import { createPostSchema, postSchema, updatePostSchema } from './docs/post/schemas.js';
import { signInSchema, signUpSchema } from './docs/user/schemas.js';
import {
  getUserDoc, signInDoc, signOutDoc, signUpDoc,
} from './docs/user/user.docs.js';

const info = {
  version: '1.0.0',
  title: 'Linkr Api',
  description: 'Esta api está servindo a uma aplicação de rede social que tem como objetivo a interação entre usuários e compartilhamento de links!',
};

const paths = {
  '/signup': signUpDoc,
  '/signin': signInDoc,
  '/signout': signOutDoc,
  '/user/{ID}': getUserDoc,
  '/posts': { post: createPostDoc.post, get: timelineDoc.get },
  '/posts/user/{ID}': userTimelineDoc,
  '/posts/{ID}': { delete: deletePostDoc.delete, patch: updatePostDoc.patch },
};

const schemas = {
  SignUp: signUpSchema,
  SignIn: signInSchema,
  CreatePost: createPostSchema,
  UpdatePost: updatePostSchema,
  Post: postSchema,
};

const swaggerDocs = {
  openapi: '3.0.0',
  info,
  paths,
  components: { schemas },
};

export default swaggerDocs;
