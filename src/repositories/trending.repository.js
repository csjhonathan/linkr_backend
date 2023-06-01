import db from '../database/connection.js';

export function getTrending() {
  const query = db.query(`
		SELECT tag, COUNT(*)::INTEGER AS amount
		FROM tags
		GROUP BY tag
		ORDER BY amount DESC;
    ;`);
  return query;
}

export function hashtagById(hashtag) {
  const query = db.query(`
	SELECT DISTINCT t.post_id, p.url, p.description, p.created_at
	FROM tags t
	JOIN posts p ON p.id = t.post_id
	WHERE t.tag = $1
	ORDER BY t.post_id DESC
	;`, [hashtag]);
  return query;
}
