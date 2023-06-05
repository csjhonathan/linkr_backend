import db from '../database/connection.js';
import postQueryBuilder from '../helpers/postQueryBuilder.js';

async function createPost(values) {
  const query = postQueryBuilder(values);
  const { rows } = await db.query(query, values);
  return rows[0];
}

async function listUserPosts(userId, id) {
  const { rows } = await db.query(`
    SELECT p.*,p.id AS post_id,
    EXISTS (
      SELECT 1
      FROM likes
      WHERE likes.post_id = p.id
      AND likes.user_id = $1
    ) AS "userLikedPost",
    COUNT(l.post_id) AS "likeCount",
    (
      SELECT ARRAY_AGG(u2.name)
      FROM likes l
      JOIN users u2 ON u2.id = l.user_id
      WHERE l.post_id = p.id
      LIMIT 2
    ) AS "likedUsers"
    FROM posts p
    LEFT JOIN likes l ON l.post_id = p.id
    WHERE p.user_id = $2
    GROUP BY p.id
    ORDER BY p.id DESC;
  `, [userId, id]);

  return rows;
}

async function listPosts(userId) {
  const { rows } = await db.query(`
  SELECT p.*,p.id AS post_id,
  u.photo AS photo,
  u.name AS name,
  EXISTS (
    SELECT 1
    FROM likes
    WHERE likes.post_id = p.id
    AND likes.user_id = $1
  ) AS "userLikedPost",
  COUNT(l.post_id) AS "likeCount",
  (
    SELECT ARRAY_AGG(u2.name)
    FROM likes l
    JOIN users u2 ON u2.id = l.user_id
    WHERE l.post_id = p.id
    LIMIT 2
  ) AS "likedUsers"
  FROM posts p
  LEFT JOIN likes l ON l.post_id = p.id
  LEFT JOIN users u ON u.id = p.user_id
  GROUP BY p.id, u.photo, u.name
  ORDER BY p.id DESC
  LIMIT 20;
  `, [userId]);
  return rows;
}

async function findPostById(id) {
  const post = await db.query(`
    SELECT * FROM posts WHERE id = $1
  `, [id]);
  return post.rows[0];
}

async function deleteOne(postId) {
  await db.query(`
    DELETE FROM likes WHERE likes.post_id = $1;
  `, [postId]);
  await db.query(`
    DELETE FROM tags WHERE tags.post_id = $1;
  `, [postId]);
  await db.query(`
    DELETE FROM posts WHERE posts.id = $1;
  `, [postId]);
}
async function update(description, postId) {
  await db.query(`
    UPDATE posts
    SET description = $1
    WHERE id = $2;
  `, [description, postId]);
}
export default {
  createPost,
  listUserPosts,
  listPosts,
  findPostById,
  deleteOne,
  update,
};
