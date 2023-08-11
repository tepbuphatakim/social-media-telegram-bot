import sequelize from '../../database/index.js';
import Feed from '../models/Feed.js';

export function getFeed() {
  return Feed.findOne({
    order: sequelize.random(),
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
