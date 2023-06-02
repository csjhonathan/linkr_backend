import db from '../database/connection.js';
import postQueryBuilder from '../helpers/postQueryBuilder.js';

async function createPost(values) {
  const query = postQueryBuilder(values);
  const { rows } = await db.query(query, values);
  return rows[0];
}

export default { createPost };
