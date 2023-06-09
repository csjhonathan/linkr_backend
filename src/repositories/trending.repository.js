import db from '../database/connection.js';

export function getTrending() {
  const query = db.query(`
  SELECT 
    CASE 
        WHEN tag LIKE '#%' THEN REPLACE(tag, '#', '')
        ELSE tag
    END AS tag,
    COUNT(*)::INTEGER AS amount
  FROM tags
  GROUP BY 
    CASE 
        WHEN tag LIKE '#%' THEN REPLACE(tag, '#', '')
        ELSE tag
    END
  ORDER BY amount DESC
  LIMIT 10
  ;`);
  return query;
}

export function hashtagById(userId, hashtag) {
  const query = db.query(`
  SELECT 
    DISTINCT t.post_id, p.url, p.description, p.created_at, 
    u.name, u.photo, u.id AS user_id,
    EXISTS (
      SELECT 1
      FROM likes
      WHERE likes.post_id = p.id
      AND likes.user_id = $1
    ) AS "userLikedPost",
    (
      SELECT ARRAY_AGG(u2.name)
      FROM likes l
      JOIN users u2 ON u2.id = l.user_id
      WHERE l.post_id = p.id
      LIMIT 2
    ) AS "likedUsers",
    (
      SELECT COUNT(*)
      FROM likes
      WHERE likes.post_id = p.id
    ) AS "likeCount",
    (
      SELECT COUNT(*)
      FROM comments
      WHERE comments.post_id = p.id
    ) AS "commentCount",
    (
      SELECT COUNT(*)
      FROM reposts
      WHERE reposts.post_id = p.id
    ) AS "repostCount"
  FROM tags t
  JOIN posts p ON p.id = t.post_id
  JOIN users u ON u.id = p.user_id
  WHERE t.tag = REPLACE($2, '#', '') OR t.tag = CONCAT('#', $2) OR t.tag = $2
  ORDER BY t.post_id DESC
  ;`, [userId, hashtag]);

  return query;
}
