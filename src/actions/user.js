import { getAllUsers, deleteUser } from '../services/user.js';

export async function getAll(req, res, next) {
  try {
    const { page, limit } = req.query;
    const users = await getAllUsers({ page, limit });
    res.send(users);
  } catch (error) {
    next(error);
  }
}

export async function deleteById(req, res, next) {
  try {
    await deleteUser(req.params.id);
    res.send({ success: true });
  } catch (error) {
    next(error);
  }
}
