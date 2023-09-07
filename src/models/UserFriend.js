import { DataTypes } from 'sequelize';
import BaseModel from './BaseModel.js';
import { FRIEND_STATUS } from '../constants/index.js';
import User from './User.js';

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

export const uniqueKeys = {
  user_friend: {
    customIndex: true,
    fields: ['id_user', 'id_friend'],
  },
};

UserFriend.init(attributes, {
  ...BaseModel.CONFIG,
  uniqueKeys,
  modelName: 'UserFriend',
  tableName: 'user_friend',
});

UserFriend.belongsTo(User, {
  foreignKey: 'id_user',
  as: 'user',
});

UserFriend.belongsTo(User, {
  foreignKey: 'id_friend',
  as: 'friend',
});

export default UserFriend;
