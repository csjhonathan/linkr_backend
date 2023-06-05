import Jwt from 'jsonwebtoken';
import { getTrending, hashtagById } from '../repositories/trending.repository.js';
import { listInvalidToken } from '../repositories/blacklist.repositories.js';

export async function listTrending(req, res) {
  const { token } = res.locals;

  try {
    const invalidToken = await listInvalidToken(token);
    if (invalidToken.rowCount !== 0) return res.status(401).send('User not allowed access.');
    const listTrending = await getTrending();
    res.send(listTrending.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function listHashtagById(req, res) {
  const { token } = res.locals;
  const { hashtag } = req.params;

  try {
    const invalidToken = await listInvalidToken(token);
    if (invalidToken.rowCount !== 0) return res.status(401).send('User not allowed access.');
    const { id: userId } = Jwt.verify(token, process.env.SECRET_KEY);
    const postsByHashtag = await hashtagById(userId, hashtag);
    res.send(postsByHashtag.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
