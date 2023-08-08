import { Model } from 'sequelize';
import sequelize from '../../database/index.js';

class BaseModel extends Model {
  static config = {
    sequelize,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    defaultScope: {
      attributes: {
        exclude: ['created_at', 'updated_at'],
      },
    },
  };
}

export default BaseModel;
