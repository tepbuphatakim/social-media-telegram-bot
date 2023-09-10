import { getAllFeeds, deleteFeed } from '../services/feed.js';

export async function getAll(req, res, next) {
  try {
    const { id_user, page, limit } = req.query;
    const feeds = await getAllFeeds({ id_user, page, limit });
    res.send(feeds);
  } catch (error) {
    next(error);
  }
}

export async function deleteById(req, res, next) {
  try {
    await deleteFeed(req.params.id);
    res.send({ success: true });
  } catch (error) {
    next(error);
  }
}
