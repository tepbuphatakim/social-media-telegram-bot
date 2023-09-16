module.exports = {
  async up(queryInterface, Sequelize) {
    const { attributes } = await import('../../src/models/Admin.js');
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable(
        'admin',
        {
          ...attributes,
          created_at: {
            allowNull: false,
            type: 'TIMESTAMP',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          },
          updated_at: {
            allowNull: false,
            type: 'TIMESTAMP',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          },
        },
        { transaction }
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
  async down(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable('admin');
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
