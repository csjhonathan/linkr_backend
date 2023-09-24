/* eslint-disable import/prefer-default-export */
import { createCommentDoc, getCommentsDoc } from './comments/comments.docs.js';
import { createFollowDoc, deleteFollowDoc, getFollowingsDoc } from './follow/follow.docs.js';
import { createLikeDoc, deleteLikeDoc } from './like/like.doc.js';
import {
  createPostDoc, deletePostDoc, timelineDoc, updatePostDoc, userTimelineDoc,
} from './post/post.docs.js';
import { repostDoc } from './repost/repost.docs.js';
import { getUserBySearchDoc } from './search/search.docs.js';
import { getTrendingDoc, getTrendingListDoc } from './trending/trending.docs.js';
import {
  getUserDoc, signInDoc, signOutDoc, signUpDoc,
} from './user/user.docs.js';

export const paths = {
  '/signup': signUpDoc,
  '/signin': signInDoc,
  '/signout': signOutDoc,
  '/user/{ID}': getUserDoc,
  '/posts': { post: createPostDoc.post, get: timelineDoc.get },
  '/posts/user/{ID}': userTimelineDoc,
  '/posts/{ID}': { delete: deletePostDoc.delete, patch: updatePostDoc.patch },
  '/likes/posts/{ID}': { post: createLikeDoc.post, delete: deleteLikeDoc.delete },
  '/trending': getTrendingListDoc,
  '/trending/{HASHTAG}': getTrendingDoc,
  '/search': getUserBySearchDoc,
  '/follow/{ID}': createFollowDoc,
  '/unfollow/{ID}': deleteFollowDoc,
  '/follow': getFollowingsDoc,
  '/repost': repostDoc,
  '/comments/posts/{ID}': { post: createCommentDoc.post, get: getCommentsDoc.get },
};
