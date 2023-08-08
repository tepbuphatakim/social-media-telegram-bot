import { DataTypes } from 'sequelize';
import BaseModel from './BaseModel.js';

class Todo extends BaseModel {}

export const attributes = {
  id_todo: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  done: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    default: false,
  },
};

Todo.init(attributes, {
  ...BaseModel.CONFIG,
  modelName: 'Todo',
  tableName: 'todo',
});

export default Todo;
