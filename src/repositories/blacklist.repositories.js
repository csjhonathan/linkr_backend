import db from '../database/connection.js';

export function createInvalidToken(token) {
  const query = {
    text: `
      INSERT INTO blacklist (token)
      VALUES ($1)
    `,
    values: [token],
  };

  return db.query(query);
}

export function listInvalidToken(token) {
  const query = {
    text: `
      SELECT * 
      FROM blacklist
      WHERE token = $1
    `,
    values: [token],
  };

  return db.query(query);
}
