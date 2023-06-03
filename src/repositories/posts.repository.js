import db from '../database/connection.js';
import postQueryBuilder from '../helpers/postQueryBuilder.js';

async function createPost(values) {
  const query = postQueryBuilder(values);
  const { rows } = await db.query(query, values);
  return rows[0];
}

async function listUserPosts(id) {
  const { rows } = await db.query(`
    SELECT *
    FROM posts
    WHERE user_id = $1
    ORDER BY id DESC
    LIMIT 20;
  `, [id]);

  return rows;
}

async function listPosts() {
  const { rows } = await db.query(`
    SELECT *
    FROM posts
    ORDER BY id DESC
    LIMIT 20;
  `);

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
