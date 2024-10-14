"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Hash the password for the support user
    const hashedPassword = await bcrypt.hash("Support@123", 10);

    console.log(hashedPassword.toString(), "The hashed pass");

    await queryInterface.bulkInsert(
      "Users",
      [
        {
          userId: 1, // Adjust this if needed based on your existing IDs
          roleId: 4, // 4 corresponds to the SUPPORT_USER role
          fullName: "Support User",
          email: "giovannixon@gmail.com",
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(
      "Users",
      { email: "giovannixon@gmail.com" },
      {}
    );
  },
};
