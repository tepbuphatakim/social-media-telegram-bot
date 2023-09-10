import { getAllFeeds, deleteFeed } from '../services/feed.js';

export async function getAll(req, res, next) {
  try {
    const { page, limit } = req.query;
    const feeds = await getAllFeeds({ page, limit });
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
