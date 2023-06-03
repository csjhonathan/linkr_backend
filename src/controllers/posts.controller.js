import postsRepository from '../repositories/posts.repository.js';
import tagsRepository from '../repositories/tags.repository.js';

async function create(req, res) {
  const { schema, user } = res.locals;
  const {
    url, description, createdAt,
  } = schema;
  const regex = /#\w{1,}/g;
  const hashtagList = description && description.match(regex);
  const values = description ? [url, description, user.id, createdAt] : [url, user.id, createdAt];

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

async function listUserTimeline(req, res) {
  const { id } = req.params;
  try {
    const timelinePosts = await postsRepository.listUserPosts(id);

    return res.status(200).send(timelinePosts);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

async function listTimelinePosts(req, res) {
  try {
    const timelinePosts = await postsRepository.listPosts();

    return res.status(200).send(timelinePosts);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export default { create, listTimelinePosts, listUserTimeline };
