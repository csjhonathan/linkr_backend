import db from '../database/connection.js';

export function createRepost(postId, userId) {
  const query = db.query(`
        INSERT INTO reposts (post_id, user_id)
        VALUES ($1, $2)
    ;`, [Number(postId), Number(userId)]);
  return query;
}
