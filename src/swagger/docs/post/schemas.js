/* eslint-disable import/prefer-default-export */

export const createPostSchema = {
  type: 'object',
  properties: {
    url: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    createdAt: {
      type: 'string',
    },
  },
};

export const postSchema = {
  type: 'object',
  properties:
      {
        post_id:
        { type: 'number' },
        photo:
        { type: 'string' },
        name:
        { type: 'string' },
        repost_user_id:
        { type: 'number' },
        repost_user_name:
        { type: 'string' },
        repost_created_at:
        {
          type: 'string',
          format: 'string',
        },
        userLikedPost:
        { type: 'boolean' },
        likeCount:
        { type: 'number' },
        likedUsers:
        {
          type: 'array',
          items:
          { type: 'string' },
        },
        commentCount:
        { type: 'number' },
      },
};

export const updatePostSchema = {
  type: 'object',
  properties: {
    description: {
      type: 'string',
    },
  },
};
