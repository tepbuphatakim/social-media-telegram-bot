import { DataTypes, Model } from 'sequelize';
import sequelize from '../../database/index.js';
// import app from '../../index.js';

// const { sequelize } = app;

class Todo extends Model {}

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
  sequelize,
  modelName: 'Todo',
  tableName: 'todo',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  defaultScope: {
    attributes: {
      exclude: ['created_at', 'updated_at'],
    },
  },
});

export default Todo;
