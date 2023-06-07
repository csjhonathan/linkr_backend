import db from '../database/connection.js';

export default function searching(name, id) {
  const query = db.query(`
    SELECT u.id, u.name, u.photo,
    EXISTS (
      SELECT 1
      FROM follows f
      WHERE f.followed_id = u.id
      AND f.user_id = $2
    ) AS "followingUser"
    FROM users u 
    WHERE unaccent(name) ILIKE unaccent('%' || $1 || '%')
    ORDER BY "followingUser" DESC, u.name;
    `, [name, id]);
  return query;
}
