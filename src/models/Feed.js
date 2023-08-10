import { DataTypes } from 'sequelize';
import BaseModel from './BaseModel.js';

class Feed extends BaseModel {}

export const attributes = {
  id_feed: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    references: {
      model: 'user',
      key: 'id_user',
    },
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  photo_telegram_server: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
};

Feed.init(attributes, {
  ...BaseModel.CONFIG,
  modelName: 'Feed',
  tableName: 'feed',
});

export default Feed;
