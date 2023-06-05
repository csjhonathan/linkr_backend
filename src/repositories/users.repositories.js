import db from '../database/connection.js';
import userQueryBuilder from '../helpers/userQueryBuilder.js';

export function createUser(data) {
  const query = userQueryBuilder(data);
  return db.query(query);
}

export function getUserByEmail(email) {
  const query = {
    text: `
      SELECT u.id, u.name, u.email, u.password, u.photo
      FROM users u
      WHERE email = $1;
    `,
    values: [email],
  };

  return db.query(query);
}

export function getUserById(userId) {
  const query = {
    text: `
      SELECT u.id, u.name, u.email, u.photo
      FROM users u
      WHERE id = $1;
    `,
    values: [userId],
  };

  return db.query(query);
}
