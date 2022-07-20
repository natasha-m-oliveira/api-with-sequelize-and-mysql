const database = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

class TurmaController {
  static async getAllTurmas(req, res) {
    try {
      const { dataInicial, dataFinal } = req.query;
      const where = {};
      dataInicial || dataFinal ? (where.dataInicio = {}) : null;
      dataInicial ? (where.dataInicio[Op.gte] = dataInicial) : null;
      dataFinal ? (where.dataInicio[Op.lte] = dataFinal) : null;
      const turmas = await database.Turmas.findAll({ where });
      return res.status(200).json(turmas);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async getTurmaById(req, res) {
    try {
      const { id } = req.params;
      const turma = await database.Turmas.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(turma);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async createTurma(req, res) {
    try {
      const newTurma = req.body;
      const turma = await database.Turmas.create(newTurma);
      return res.status(201).json(turma);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async restoreTurma(req, res) {
    try {
      const { id } = req.params;
      await database.Turmas.restore({ where: { id: Number(id) } });
      return res
        .status(200)
        .json({ message: `Id ${id} restaurado com sucesso.` });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async updateTurma(req, res) {
    try {
      const { id } = req.params;
      const newData = req.body;
      await database.Turmas.update(newData, {
        where: { id: Number(id) },
      });
      const updatedTurma = await database.Turmas.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(updatedTurma);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async deleteTurma(req, res) {
    try {
      const { id } = req.params;
      await database.Turmas.destroy({
        where: { id: Number(id) },
      });
      return res
        .status(200)
        .json({ message: `Id ${id} excluído com sucesso.` });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
}

module.exports = TurmaController;
