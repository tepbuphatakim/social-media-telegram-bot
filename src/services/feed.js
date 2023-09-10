import sequelize from '../../database/index.js';
import Feed from '../models/Feed.js';
import { Op } from 'sequelize';
import { deleteFile } from './storage.js';

export function getAllFeeds() {
  return Feed.findAndCountAll();
}

export function getFeed() {
  return Feed.findOne({
    order: sequelize.random(),
  });
}

export function getLatestFeedByIdUser(id_user, fromIdFeed = null) {
  return Feed.findOne({
    where: {
      id_user,
      ...(fromIdFeed && {
        id_feed: {
          [Op.lt]: fromIdFeed,
        },
      }),
    },
    order: [['id_feed', 'DESC']],
  });
}

export function createFeed(feed) {
  return Feed.create(feed);
}

export function updateFeed(id_feed, feed) {
  return Feed.update(feed, {
    where: {
      id_feed,
    },
  });
}

export async function deleteFeed(id_feed) {
  const feed = await Feed.findByPk(id_feed);
  if (!feed) throw new Error('Cannot find feed with specified id.');

  deleteFile(feed.photo);
  return feed.destroy();
}
