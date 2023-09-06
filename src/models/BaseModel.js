import { Model } from 'sequelize';
import sequelize from '../../database/index.js';

class BaseModel extends Model {
  static async createOrUpdate(data, condition) {
    const item = await this.findOne({
      where: condition,
    });
    if (item) {
      return this.update(data, {
        where: condition,
      });
    }
    return this.create({
      ...data,
      ...condition,
    });
  }

  static CONFIG = {
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
