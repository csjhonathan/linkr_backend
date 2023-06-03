import postsRepository from '../repositories/posts.repository.js';

async function postExistsValidation(req, res, next) {
  const { postId } = req.params;

  try {
    const postExists = await postsRepository.findPostById(postId);
    if (!postExists) return res.sendStatus(404);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
  return next();
}

export default postExistsValidation;
