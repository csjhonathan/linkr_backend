import db from '../database/connection.js';

async function create(body, userId, postId) {
  const { description } = body;
  await db.query(`
    INSERT INTO comments (user_id, post_id, description) 
    VALUES ($1,$2, $3);
  `, [userId, postId, description]);
}

async function findComments(userId, postId) {
  const comments = await db.query(`
    SELECT c.*,
    u.photo AS photo,
    u.name AS name,
    EXISTS (
      SELECT 1
      FROM follows f
      WHERE f.followed_id = c.user_id
      AND f.user_id = $1
    ) AS "followingUser"
    FROM "comments" c
    LEFT JOIN users u ON u.id = c.user_id
    WHERE c.post_id = $2
    ORDER BY c.id asc;
  `, [userId, postId]);
  return comments.rows;
}

export default { create, findComments };
