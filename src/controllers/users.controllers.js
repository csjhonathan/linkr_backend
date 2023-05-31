import bcrypt from 'bcrypt';
import db from '../database/connection.js';
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
