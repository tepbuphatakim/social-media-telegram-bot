module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      const { faker } = await import('@faker-js/faker');
      const { saveFileFromURL } = await import('../../src/services/storage.js');
      const dumpUserRows = 10;

      const users = await Promise.all(
        [...Array(dumpUserRows)].map(async (_) => {
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
      const firstUserId = await queryInterface.bulkInsert('user', users, {
        transaction,
      });

      const allUsersFeeds = [];
      for (let i = firstUserId; i < firstUserId + dumpUserRows; i++) {
        const feeds = await Promise.all(
          [...Array(10)].map(async (_) => {
            return {
              id_user: i,
              photo: await saveFileFromURL(faker.internet.avatar()),
              description: faker.word.words({ count: 5 }),
            };
          })
        );
        allUsersFeeds.push(...feeds);
      }
      await queryInterface.bulkInsert('feed', allUsersFeeds, {
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkDelete('user', null, { transaction });
      await queryInterface.bulkDelete('feed', null, { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
