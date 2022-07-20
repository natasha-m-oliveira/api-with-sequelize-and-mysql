const database = require("../models");

class Services {
  constructor(modelName) {
    this.modelName = modelName;
  }

  async getAllRecords({ where = {} }) {
    return database[this.modelName].findAll({ where: { ...where } });
  }

  async getRecordById(where) {
    return database[this.modelName].findOne({
      where: { ...where },
    });
  }

  async getAndCountRecords(where = {}, aggregators = {}) {
    return database[this.modelName].findAndCountAll({
      where: {
        ...where,
      },
      ...aggregators,
    });
  }

  async createRecord(data) {
    return database[this.modelName].create(data);
  }

  async updateRecord(newData, id, transaction = {}) {
    return database[this.modelName].update(
      newData,
      {
        where: { id: Number(id) },
      },
      transaction
    );
  }

  async updateRecords(newData, where, transaction = {}) {
    return database[this.modelName].update(
      newData,
      {
        where: { ...where },
      },
      transaction
    );
  }

  async deleteRecord(where) {
    return database[this.modelName].destroy({
      where: { ...where },
    });
  }

  async restoreRecord(where) {
    return database[this.modelName].restore({ where: { ...where } });
  }
}

module.exports = Services;
