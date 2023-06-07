import db from '../database/connection.js';
import postQueryBuilder from '../helpers/postQueryBuilder.js';
import tagsRepository from './tags.repository.js';

async function createPost(values) {
  const query = postQueryBuilder(values);
  const { rows } = await db.query(query, values);
  return rows[0];
}

async function listUserPosts(userId, id) {
  const { rows } = await db.query(`
  SELECT subquery.*, (COUNT(*) OVER (PARTITION BY subquery.post_id) - 1) AS "repostCount"
  FROM (
    SELECT p.*, p.id AS post_id,
      u.photo AS photo,
      u.name AS name,
      NULL AS repost_user_id,
      NULL AS repost_user_name,
      NULL AS repost_created_at,
      EXISTS (
        SELECT 1
        FROM likes
        WHERE likes.post_id = p.id
        AND likes.user_id = $1
      ) AS "userLikedPost",
      COUNT(DISTINCT l.user_id) AS "likeCount",
      COUNT(DISTINCT c.user_id) AS "commentCount",
      (
        SELECT ARRAY_AGG(u2.name)
        FROM likes l
        JOIN users u2 ON u2.id = l.user_id
        WHERE l.post_id = p.id
        LIMIT 2
      ) AS "likedUsers"
    FROM posts p
    LEFT JOIN likes l ON l.post_id = p.id
    LEFT JOIN comments c ON c.post_id = p.id
    LEFT JOIN users u ON u.id = p.user_id
    LEFT JOIN reposts r ON r.post_id = p.id
    LEFT JOIN users ru ON ru.id = r.user_id
    WHERE (p.user_id = $2)
    GROUP BY p.id, u.photo, u.name, r.user_id, ru.name

    UNION

    SELECT p.*, p.id AS post_id,
      u.photo AS photo,
      u.name AS name,
      r.user_id AS repost_user_id,
      ru.name AS repost_user_name,
      r.created_at AS repost_created_at,
      EXISTS (
        SELECT 1
        FROM likes
        WHERE likes.post_id = p.id
        AND likes.user_id = $1
      ) AS "userLikedPost",
      COUNT(DISTINCT l.user_id) AS "likeCount",
      COUNT(DISTINCT c.user_id) AS "commentCount",
      (
        SELECT ARRAY_AGG(u2.name)
        FROM likes l
        JOIN users u2 ON u2.id = l.user_id
        WHERE l.post_id = p.id
        LIMIT 2
      ) AS "likedUsers"
    FROM posts p
    LEFT JOIN likes l ON l.post_id = p.id
    LEFT JOIN comments c ON c.post_id = p.id
    LEFT JOIN users u ON u.id = p.user_id
    LEFT JOIN reposts r ON r.post_id = p.id
    LEFT JOIN users ru ON ru.id = r.user_id
    WHERE (p.user_id = $2 OR (r.user_id = $2 AND r.user_id IS NOT NULL))
      AND (r.user_id = $2 OR r.user_id IS NULL)
    GROUP BY p.id, u.photo, u.name, r.user_id, ru.name, r.created_at, p.created_at
  ) AS subquery
  ORDER BY GREATEST(repost_created_at, created_at) DESC, post_id DESC

  LIMIT 20;
  `, [userId, id]);

  return rows;
}

async function listPosts(userId) {
  const { rows } = await db.query(`
  SELECT subquery.*, (COUNT(*) OVER (PARTITION BY subquery.post_id) - 1) AS "repostCount"
  FROM (
    SELECT p.*, p.id AS post_id,
      u.photo AS photo,
      u.name AS name,
      NULL AS repost_user_id,
      NULL AS repost_user_name,
      NULL AS repost_created_at,
      EXISTS (
        SELECT 1
        FROM likes
        WHERE likes.post_id = p.id
        AND likes.user_id = $1
      ) AS "userLikedPost",
      COUNT(DISTINCT l.user_id) AS "likeCount",
      COUNT(DISTINCT c.user_id) AS "commentCount",
      (
        SELECT ARRAY_AGG(u2.name)
        FROM likes l
        JOIN users u2 ON u2.id = l.user_id
        WHERE l.post_id = p.id
        LIMIT 2
      ) AS "likedUsers"
    FROM posts p
    LEFT JOIN likes l ON l.post_id = p.id
    LEFT JOIN comments c ON c.post_id = p.id
    LEFT JOIN users u ON u.id = p.user_id
    LEFT JOIN reposts r ON r.post_id = p.id
    LEFT JOIN users ru ON ru.id = r.user_id
    GROUP BY p.id, u.photo, u.name, r.user_id, ru.name

    UNION

    SELECT p.*, p.id AS post_id,
      u.photo AS photo,
      u.name AS name,
      r.user_id AS repost_user_id,
      ru.name AS repost_user_name,
      r.created_at AS repost_created_at,
      EXISTS (
        SELECT 1
        FROM likes
        WHERE likes.post_id = p.id
        AND likes.user_id = $1
      ) AS "userLikedPost",
      COUNT(DISTINCT l.user_id) AS "likeCount",
      COUNT(DISTINCT c.user_id) AS "commentCount",
      (
        SELECT ARRAY_AGG(u2.name)
        FROM likes l
        JOIN users u2 ON u2.id = l.user_id
        WHERE l.post_id = p.id
        LIMIT 2
      ) AS "likedUsers"
    FROM posts p
    LEFT JOIN likes l ON l.post_id = p.id
    LEFT JOIN comments c ON c.post_id = p.id
    LEFT JOIN users u ON u.id = p.user_id
    LEFT JOIN reposts r ON r.post_id = p.id
    LEFT JOIN users ru ON ru.id = r.user_id
    GROUP BY p.id, u.photo, u.name, r.user_id, ru.name, r.created_at, p.created_at
  ) AS subquery
  ORDER BY GREATEST(repost_created_at, created_at) DESC, post_id DESC

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
  const regex = /#\w{1,}/g;
  const hashtagList = description && description.match(regex);

  await db.query(`
    DELETE FROM tags WHERE tags.post_id = $1;
  `, [postId]);

  if (hashtagList) {
    await tagsRepository.insertTag(hashtagList, postId);
  }

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
