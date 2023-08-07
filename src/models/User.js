import { DataTypes, Model } from 'sequelize';
import sequelize from '../../database/index.js';

class User extends Model {
  static async upsert(user, condition = {}) {
    try {
      const item = await this.findOne({
        where: condition,
      });
      if (item) {
        return this.update(user, {
          where: condition,
        });
      }
      return this.create(user);
    } catch (error) {
      throw error;
    }
  }
}

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
  sequelize,
  modelName: 'User',
  tableName: 'user',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  defaultScope: {
    attributes: {
      exclude: ['created_at', 'updated_at'],
    },
  },
});

export default User;
