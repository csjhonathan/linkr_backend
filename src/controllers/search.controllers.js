import Jwt from 'jsonwebtoken';
import { listInvalidToken } from '../repositories/blacklist.repositories.js';
import { searching } from '../repositories/search.repository.js';

export async function searchUsers(req, res) {
  const { authorization } = req.headers;
  const { name } = req.query;
  const token = authorization?.replace('Bearer ', '');
  if (!token) return res.sendStatus(401);
  try {
    const invalidToken = await listInvalidToken(token);
    if (invalidToken.rowCount !== 0) return res.status(401).send('User not allowed access.');
    // Jwt.verify(token, process.env.SECRET_KEY);
    const listSearch = await searching(name);
    res.send(listSearch.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
