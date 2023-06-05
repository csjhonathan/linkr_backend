import postsRepository from '../repositories/posts.repository.js';

export async function postExistsValidation(req, res, next) {
  const { postId } = req.params;

  try {
    const postExists = await postsRepository.findPostById(postId);
    if (!postExists) return res.sendStatus(404);
    res.locals.post = postExists;
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
  return next();
}

export async function validateOwnership(req, res, next) {
  const { user, post } = res.locals;

  try {
    if (post.user_id !== user.id) return res.sendStatus(401);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
  return next();
}
