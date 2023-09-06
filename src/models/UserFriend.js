import { DataTypes } from 'sequelize';
import BaseModel from './BaseModel.js';
import { FRIEND_STATUS } from '../constants/index.js';

class UserFriend extends BaseModel {}

export const attributes = {
  id_user_friend: {
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
  id_friend: {
    type: DataTypes.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    references: {
      model: 'user',
      key: 'id_user',
    },
  },
  status: {
    type: DataTypes.ENUM(Object.values(FRIEND_STATUS)),
    allowNull: false,
    defaultValue: FRIEND_STATUS.PENDING,
  },
};

UserFriend.init(attributes, {
  ...BaseModel.CONFIG,
  modelName: 'UserFriend',
  tableName: 'user_friend',
});

export default UserFriend;
