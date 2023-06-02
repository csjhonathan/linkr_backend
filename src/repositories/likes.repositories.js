import db from '../database/connection.js';

async function createLike(userId, postId) {
  await db.query(`
    INSERT INTO likes (user_id, post_id) 
    VALUES ($1,$2);
  `, [userId, postId]);
}

async function findLikeByUserIdAndPostId(userId, postId) {
  const likeExists = await db.query(`
    SELECT *
    FROM likes
    WHERE user_id = $1 AND post_id = $2;
  `, [userId, postId]);

  return likeExists.rows[0];
}

async function deleteLikeByUserIdAndPostId(userId, postId) {
  await db.query(`
    DELETE FROM likes
    WHERE user_id = $1 AND post_id = $2;
  `, [userId, postId]);
}

export default { createLike, findLikeByUserIdAndPostId, deleteLikeByUserIdAndPostId };
