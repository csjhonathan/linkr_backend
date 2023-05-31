import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import * as usersRepository from '../repositories/users.repositories.js';

export async function signUp(req, res) {
  const { schema } = res.locals;

  try {
    schema.password = bcrypt.hashSync(schema.password, 10);

    await usersRepository.create(schema);

    return res.status(201).send({ message: 'User has been registered!' });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}

export async function signIn(req, res) {
  const { user, schema } = res.locals;
  const passwordIsCorrect = bcrypt.compareSync(schema.password, user.password);

  if (!passwordIsCorrect) return res.status(401).send({ message: 'Incorrect password!' });

  const payload = { id: user.id, name: user.name, email: user.email };
  const token = Jwt.sign(payload, process.env.SECRET_KEY);

  return res.status(200).send({ token });
}
