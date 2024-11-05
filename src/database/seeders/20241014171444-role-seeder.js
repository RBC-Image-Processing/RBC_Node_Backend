"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Roles",
      [
        {
          roleId: 1,
          roleName: "NON_SPECIALIST",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          roleId: 2,
          roleName: "PHYSICIAN",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          roleId: 3,
          roleName: "RADIOLOGIST",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          roleId: 4,
          roleName: "ADMINISTRATOR",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Roles", null, {});
  },
};
