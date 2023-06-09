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
  const { id } = req.params;// id do usuario dono dos posts
  const { user } = res.locals;// id do usuario logado
  const { offset } = res.query;
  try {
    const timelinePosts = await postsRepository.listUserPosts(user.id, id, offset);

    return res.status(200).send(timelinePosts);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

async function listTimelinePosts(req, res) {
  const { user } = res.locals;
  const { offset } = res;

  try {
    const timelinePosts = await postsRepository.listPosts(user.id, offset);

    return res.status(200).send(timelinePosts);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

async function deletePost(req, res) {
  const { postId } = req.params;

  try {
    await postsRepository.deleteOne(postId);
    return res.sendStatus(204);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

async function updateDescription(req, res) {
  const { postId } = req.params;
  const { description } = req.body;

  try {
    await postsRepository.update(description, postId);
    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export default {
  create,
  listTimelinePosts,
  listUserTimeline,
  deletePost,
  updateDescription,
};
