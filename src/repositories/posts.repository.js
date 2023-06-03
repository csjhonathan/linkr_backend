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
export default { createPost, listUserPosts, listPosts };
