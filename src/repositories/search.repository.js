import db from '../database/connection.js';

export function searching(name) {
  const query = db.query(`
    SELECT u.id, u.name, u.photo 
    FROM users u 
    WHERE unaccent(name) ILIKE unaccent('%' || $1 || '%');
    `, [name]);
  return query;
}
