import Jwt from 'jsonwebtoken';
import * as blacklistRepositories from '../repositories/blacklist.repositories.js';
import * as usersRepositories from '../repositories/users.repositories.js';

export default async function tokenValidator(req, res, next) {
  const { authorization, userid: userId } = req.headers;
  const token = authorization?.split(' ')[1];
  console.log(authorization, userId);
  if (!token || !authorization) return res.status(401).send({ message: 'Valid token required!' });
  try {
    const { rows: [invalidToken] } = await blacklistRepositories.listInvalidToken(token);

    if (invalidToken) {
      return res.status(401).send({ message: 'Valid token required, this token has expired!' });
    }

    const { id } = Jwt.verify(token, process.env.SECRET_KEY);
    const { rows: [user] } = await usersRepositories.getUserById(id);

    if (Number(userId) !== Number(user.id)) {
      return res.status(401).send({ message: 'You do not have permission to perform this action (invalid access key)!' });
    }

    res.locals.token = token;
    res.locals.user = user;
    return next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).send({ message: 'Invalid token, please login again!' });
    }
    return res.status(500).send({ message: error.message });
  }
}
