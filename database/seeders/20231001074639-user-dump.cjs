module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      const { faker } = await import('@faker-js/faker');
      const { saveFileFromURL } = await import('../../src/services/storage.js');

      const users = await Promise.all(
        [...Array(100)].map(async (_) => {
          return {
            id_telegram: 0,
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            username: faker.internet.userName(),
            pf_photo: await saveFileFromURL(faker.internet.avatar()),
            pf_name: faker.internet.userName(),
            pf_description: faker.word.words({ count: 5 }),
          };
        })
      );

      await queryInterface.bulkInsert('user', users);
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkDelete('user', null, {});
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
