"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Matriculas",
      [
        {
          status: "confirmado",
          estudanteId: 1,
          turmaId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          status: "confirmado",
          estudanteId: 2,
          turmaId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          status: "confirmado",
          estudanteId: 3,
          turmaId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          status: "confirmado",
          estudanteId: 4,
          turmaId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          status: "cancelado",
          estudanteId: 1,
          turmaId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          status: "cancelado",
          estudanteId: 2,
          turmaId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Matriculas", null, {});
  },
};
