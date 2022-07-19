"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Turmas",
      [
        {
          dataInicio: "2020-02-01",
          nivelId: 1,
          docenteId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          dataInicio: "2020-02-01",
          nivelId: 2,
          docenteId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          dataInicio: "2020-02-01",
          nivelId: 3,
          docenteId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          dataInicio: "2020-07-01",
          nivelId: 3,
          docenteId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Turmas", null, {});
  },
};
