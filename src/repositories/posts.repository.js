import db from '../database/connection.js';
import postQueryBuilder from '../helpers/postQueryBuilder.js';

async function createPost(values) {
  const query = postQueryBuilder(values);
  const { rows } = await db.query(query, values);
  return rows[0];
}

async function listUserPosts(userId, id) {
  const { rows } = await db.query(`
    SELECT posts.*, 
    EXISTS (
      SELECT 1
      FROM likes
      WHERE likes.post_id = posts.id
      AND likes.user_id = $1
    ) AS user_liked_post,
    COUNT(likes.post_id) AS like_count
    FROM posts
    LEFT JOIN likes ON likes.post_id = posts.id
    WHERE posts.user_id = $2
    GROUP BY posts.id
  `, [userId, id]);

  return rows;
}

async function listPosts(userId) {
  const { rows } = await db.query(`
    SELECT posts.*, 
      EXISTS (
        SELECT 1
        FROM likes
        WHERE likes.post_id = posts.id
        AND likes.user_id = $1
      ) AS user_liked_post,
      COUNT(likes.post_id) AS like_count
    FROM posts
    LEFT JOIN likes ON likes.post_id = posts.id
    GROUP BY posts.id
    ORDER BY posts.id DESC
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
