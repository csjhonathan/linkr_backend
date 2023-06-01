import likesRepositories from '../repositories/likes.repositories.js';

export async function likePost(req, res) {
  const { user } = res.locals;
  const { postId } = req.params;

  try {
    await likesRepositories.createLike(user.id, postId);
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function unlikePost(req, res) {
  const { user } = res.locals;
  const { postId } = req.params;

  try {
    await likesRepositories.deleteLikeByUserIdAndPostId(user.id, postId);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
