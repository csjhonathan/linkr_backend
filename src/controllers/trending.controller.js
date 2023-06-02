import Jwt from 'jsonwebtoken';
import { getTrending, hashtagById } from '../repositories/trending.repository.js';
import { listInvalidToken } from '../repositories/blacklist.repositories.js';

export async function listTrending(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');
  if (!token) return res.sendStatus(401);
  try {
    const invalidToken = await listInvalidToken(token);
    if (invalidToken.rowCount !== 0) return res.status(401).send('User not allowed access.');
    // Jwt.verify(token, process.env.SECRET_KEY);
    const listTrending = await getTrending();
    res.send(listTrending.rows);
  } catch (err) {
    if (err.name === 'TokenExpiredError') res.status(500).send('Token expirado');
    if (err.name === 'JsonWebTokenError') res.status(500).send('Token inválido');
    res.status(500).send(err.message);
  }
}

export async function listHashtagById(req, res) {
  const { authorization } = req.headers;
  const { hashtag } = req.params;
  const token = authorization?.replace('Bearer ', '');
  if (!token) return res.sendStatus(401);
  try {
    const invalidToken = await listInvalidToken(token);
    if (invalidToken.rowCount !== 0) return res.status(401).send('User not allowed access.');
    // Jwt.verify(token, process.env.SECRET_KEY);
    const postsByHashtag = await hashtagById(hashtag);
    res.send(postsByHashtag.rows);
  } catch (err) {
    if (err.name === 'TokenExpiredError') res.status(500).send('Token expirado');
    if (err.name === 'JsonWebTokenError') res.status(500).send('Token inválido');
    res.status(500).send(err.message);
  }
}
