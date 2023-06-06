import commentsRepositories from '../repositories/comments.repositories.js';

async function postComment(req, res) {
  const { user } = res.locals;
  const { postId } = req.params;

  try {
    await commentsRepositories.create(req.body, user.id, postId);
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export default postComment;
