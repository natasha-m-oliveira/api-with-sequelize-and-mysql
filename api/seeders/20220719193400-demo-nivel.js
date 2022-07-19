"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Niveis",
      [
        {
          descNivel: "básico",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          descNivel: "intermediário",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          descNivel: "avançado",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Niveis", null, {});
  },
};
