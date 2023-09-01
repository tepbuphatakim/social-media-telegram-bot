import sequelize from '../../database/index.js';
import Feed from '../models/Feed.js';
import { Op } from 'sequelize';

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

export function deleteFeed(id_feed) {
  return Feed.destroy({
    where: {
      id_feed,
    },
  });
}
