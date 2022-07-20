const Services = require("./Services");
const database = require("../models");

class PessoasServices extends Services {
  constructor() {
    super("Pessoas");
    this.matriculas = new Services("Matriculas");
  }
  // Métodos específicos do controlador de Pessoas

  async getActiveRecords(where = {}) {
    return database[this.modelName].findAll({ where: { ...where } });
  }

  async getAllRecords(where = {}) {
    return database[this.modelName]
      .scope("todos")
      .findAll({ where: { ...where } });
  }

  async cancelaPessoaEMatriculas(estudanteId) {
    return database.sequelize.transaction(async (transaction) => {
      await super.updateRecord({ ativo: false }, estudanteId, { transaction });
      await this.matriculas.updateRecords(
        { status: "cancelado" },
        { estudanteId: Number(estudanteId) },
        { transaction }
      );
    });
  }
}

module.exports = PessoasServices;
