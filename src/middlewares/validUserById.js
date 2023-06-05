import { getUserById } from '../repositories/users.repositories.js';

async function validUserById(req, res, next) {
  const { id } = req.params;

  try {
    const { rows } = await getUserById(id);
    const user = rows[0];

    if (!user) return res.status(404).send({ message: 'User not found.' });

    return next();
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export default validUserById;
