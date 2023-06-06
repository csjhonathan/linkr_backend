import searching from '../repositories/search.repository.js';

export default async function searchUsers(req, res) {
  const { name } = req.query;
  const { id } = res.locals.user;
  try {
    const listSearch = await searching(name, id);
    res.send(listSearch.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
}
