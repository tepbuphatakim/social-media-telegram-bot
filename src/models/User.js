import { DataTypes } from 'sequelize';
import BaseModel from './BaseModel.js';

class User extends BaseModel {}

export const attributes = {
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  id_telegram: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  is_bot: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  language_code: {
    type: DataTypes.STRING(4),
    allowNull: true,
  },
};

User.init(attributes, {
  ...BaseModel.CONFIG,
  modelName: 'User',
  tableName: 'user',
});

export default User;
