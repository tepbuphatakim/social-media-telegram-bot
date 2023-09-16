import { DataTypes } from 'sequelize';
import BaseModel from './BaseModel.js';

class Admin extends BaseModel {}

export const attributes = {
  id_admin: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

Admin.init(attributes, {
  ...BaseModel.CONFIG,
  modelName: 'Admin',
  tableName: 'admin',
});

export default Admin;
