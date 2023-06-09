import * as followsRepository from '../repositories/follows.repository.js';

export async function followUser(req, res) {
  const { id: userId } = res.locals.user;
  const { id: followedId } = req.params;
  if (Number(userId) === Number(followedId)) {
    return res.status(409).send({ message: 'You cannot perform this action on yourself!' });
  }

  try {
    const { rowCount } = await followsRepository.createFollow(userId, followedId);
    if (!rowCount) return res.status(409).send({ message: 'You already follow this user!' });
    return res.status(200).send({ message: 'Following!' });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}

export async function unfollowUser(req, res) {
  const { id: userId } = res.locals.user;
  const { id: followedId } = req.params;
  if (Number(userId) === Number(followedId)) {
    return res.status(409).send({ message: 'You cannot perform this action on yourself!' });
  }
  try {
    const { rowCount } = await followsRepository.deleteFollow(userId, followedId);
    if (!rowCount) return res.status(409).send({ message: 'No search matches the query!' });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}

export async function getFollowings(req, res) {
  const { id } = res.locals.user;
  try {
    const followingsNumber = await followsRepository.getFollowings(id);
    return res.status(200).send(followingsNumber.rows[0]);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}
