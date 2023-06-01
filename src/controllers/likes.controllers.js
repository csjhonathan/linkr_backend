import likesRepositories from '../repositories/likes.repositories.js';

async function likePost(req, res) {
  const { user } = res.locals;
  const { postId } = req.params;

  try {
    await likesRepositories.createLike(user.id, postId);
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export default likePost;
