"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      "notebooks",
      [
        {
          title: "Chickens breeds",
          image: "https://picsum.photos/id/1/200/300",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("notebooks", null, {});
  },
};
