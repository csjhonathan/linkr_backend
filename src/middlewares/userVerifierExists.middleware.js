import * as usersRepositories from '../repositories/users.repositories.js';

async function userVerifierExists(req, res, next) {
  const { path } = req;
  const { schema } = res.locals;
  try {
    const { rows: [user] } = await usersRepositories.getUserByEmail(schema.email);
    if (path.includes('/signup') && user) {
      return res.status(401).send({ message: 'Email already in use!' });
    }
    if (path.includes('/signin')) {
      if (user) {
        res.locals.user = user;
      } else {
        return res.status(404).send({ message: 'User not found!' });
      }
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
  return next();
}

export default userVerifierExists;
