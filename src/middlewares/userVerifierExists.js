import * as usersRepositories from '../repositories/users.repositories.js';

async function userVerifierExists(req, res, next) {
  const { path } = req;
  const { schema } = res.locals;
  try {
    const { rows: [user] } = await usersRepositories.getByEmail(schema.email);
    if (path.includes('/signup') && user) {
      return res.status(401).send({ message: 'Email already in use!' });
    }
    return next();
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}

export default userVerifierExists;
