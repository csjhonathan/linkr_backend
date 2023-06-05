import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import * as usersRepositories from '../repositories/users.repositories.js';
import * as blacklistRepositories from '../repositories/blacklist.repositories.js';

export async function signUp(req, res) {
  const { schema } = res.locals;

  try {
    schema.password = bcrypt.hashSync(schema.password, 10);

    await usersRepositories.createUser(schema);

    return res.status(201).send({ message: 'User has been registered!' });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}

export async function signIn(req, res) {
  const { user, schema } = res.locals;
  const passwordIsCorrect = bcrypt.compareSync(schema.password, user.password);

  if (!passwordIsCorrect) return res.status(401).send({ message: 'Incorrect password!' });

  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    photo: user.photo,
  };

  const token = Jwt.sign(payload, process.env.SECRET_KEY);

  return res.status(200).send({ token });
}

export async function signOut(req, res) {
  const { token } = res.locals;
  try {
    await blacklistRepositories.createInvalidToken(token);
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}
