import db from '../database/connection.js';
import tagQueryBuilder from '../helpers/tagQueryBuilder.js';

async function insertTag(values, id) {
  const query = tagQueryBuilder(values, id);

  db.query(query, values);
}
export default { insertTag };
