"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Users", "isActive", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true, // Set default to true (active)
    });

    await queryInterface.addColumn("Users", "verified", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false, // Set default to false (not verified)
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Users", "verified");
    await queryInterface.removeColumn("Users", "isActive");
  },
};
