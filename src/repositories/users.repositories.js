import db from '../database/connection.js';

export function createUser(data) {
  const query = {
    text: `
      INSERT INTO users (${Object.keys(data).join(', ')})
      VALUES (${Object.values(data).map((_v, i) => `$${i + 1}`).join(', ')})
    `,
    values: Object.values(data),
  };
  return db.query(query);
}

export function getUserByEmail(email) {
  const query = {
    text: `
      SELECT u.id, u.name, u.email, u.password
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
      SELECT u.id, u.name, u.email
      FROM users u
      WHERE id = $1;
    `,
    values: [userId],
  };

  return db.query(query);
}
