import db from '../database/connection.js';
import userQueryBuilder from '../helpers/userQueryBuilder.js';

export function createUser(data) {
  const query = userQueryBuilder(data);
  return db.query(query);
}

export function getUserByEmail(email) {
  const query = {
    text: `
      SELECT u.id, u.name, u.email, u.password, u.photo,
      COUNT(f.user_id = u.id)::INTEGER AS "followingsCount"
      FROM users u
      LEFT JOIN follows f
      ON f.user_id = u.id
      WHERE email = $1
      GROUP BY u.id;
    `,
    values: [email],
  };

  return db.query(query);
}

export function getUserById(userId, folowerId) {
  const query = {
    text: `
      SELECT u.id, u.name, u.email, u.photo,
      EXISTS (
        SELECT 1
        FROM follows f
        WHERE f.followed_id = $1
        AND f.user_id = $2
      ) AS "followingUser"
      FROM users u
      WHERE id = $1;
    `,
    values: [userId, folowerId],
  };

  return db.query(query);
}
