import commentsRepositories from '../repositories/comments.repositories.js';

export async function postComment(req, res) {
  const { user } = res.locals;
  const { postId } = req.params;

  try {
    await commentsRepositories.create(req.body, user.id, postId);
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getCommentsByPostId(req, res) {
  const { user } = res.locals;
  const { postId } = req.params;

  try {
    const comments = await commentsRepositories.findComments(user.id, postId);
    res.send(comments);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
