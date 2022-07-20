const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { TurmasServices } = require("../services");
const turmasServices = new TurmasServices();

class TurmaController {
  static async getAllTurmas(req, res) {
    try {
      const { dataInicial, dataFinal } = req.query;
      const where = {};
      dataInicial || dataFinal ? (where.dataInicio = {}) : null;
      dataInicial ? (where.dataInicio[Op.gte] = dataInicial) : null;
      dataFinal ? (where.dataInicio[Op.lte] = dataFinal) : null;
      const turmas = await turmasServices.getAllRecords(where);
      return res.status(200).json(turmas);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async getTurmaById(req, res) {
    try {
      const { id } = req.params;
      const turma = await turmasServices.getRecordById({ id: Number(id) });
      return res.status(200).json(turma);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async createTurma(req, res) {
    try {
      const newTurma = req.body;
      const turma = await turmasServices.createRecord(newTurma);
      return res.status(201).json(turma);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async updateTurma(req, res) {
    try {
      const { id } = req.params;
      const newData = req.body;
      await turmasServices.updateRecord(newData, id);
      const updatedTurma = await turmasServices.getRecordById({
        id: Number(id),
      });
      return res.status(200).json(updatedTurma);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async deleteTurma(req, res) {
    try {
      const { id } = req.params;
      await turmasServices.deleteRecord({ id: Number(id) });
      return res
        .status(200)
        .json({ message: `Id ${id} excluído com sucesso.` });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async restoreTurma(req, res) {
    try {
      const { id } = req.params;
      await turmasServices.restoreRecord({ id: Number(id) });
      return res
        .status(200)
        .json({ message: `Id ${id} restaurado com sucesso.` });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
}

module.exports = TurmaController;
