import { getAllFriends } from '../services/user.js';

export async function getAll(req, res, next) {
  try {
    const { id_user, page, limit } = req.query;
    const friends = await getAllFriends({ id_user, page, limit });
    res.send(friends);
  } catch (error) {
    next(error);
  }
}
