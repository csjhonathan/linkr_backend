import db from '../database/connection.js';

async function create(body, userId, postId) {
  const { description } = body;
  await db.query(`
    INSERT INTO comments (user_id, post_id, description) 
    VALUES ($1,$2, $3);
  `, [userId, postId, description]);
}

export default { create };
