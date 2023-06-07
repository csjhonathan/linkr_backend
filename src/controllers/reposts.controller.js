import { createRepost } from '../repositories/reposts.controller.js';

export async function rePost(req, res) {
  const { postId } = req.body;
  const { user } = res.locals;
  try {
    await createRepost(postId, user.id);
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
