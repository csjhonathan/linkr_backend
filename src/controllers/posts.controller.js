import postsRepository from '../repositories/posts.repository.js';
import tagsRepository from '../repositories/tags.repository.js';

async function create(req, res) {
  const { schema } = res.locals;
  const {
    url, description, userId, createdAt,
  } = schema;
  const regex = /#\w{1,}/g;
  const hashtagList = description && description.match(regex);
  const values = description ? [url, description, userId, createdAt] : [url, userId, createdAt];
  try {
    const post = await postsRepository.createPost(values);

    if (hashtagList) {
      await tagsRepository.insertTag(hashtagList, post.id);
    }
    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}
export default { create };
