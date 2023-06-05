import likesRepositories from '../repositories/likes.repositories.js';

export async function validateLike(req, res, next) {
  const { user } = res.locals;
  const { postId } = req.params;

  try {
    const likeExists = await likesRepositories.findLikeByUserIdAndPostId(user.id, postId);

    if (likeExists) return res.status(409).send({ message: 'User already liked this post' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
  return next();
}

export async function validateUnlike(req, res, next) {
  const { user } = res.locals;
  const { postId } = req.params;

  try {
    const likeExists = await likesRepositories.findLikeByUserIdAndPostId(user.id, postId);

    if (!likeExists) return res.status(404).send({ message: 'User did not like this post' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
  return next();
}
