import sequelize from '../../database/index.js';
import Feed from '../models/Feed.js';

export function getOne() {
  return Feed.findOne({
    order: sequelize.random(),
  });
}

export function create(feed) {
  return Feed.create(feed);
}
