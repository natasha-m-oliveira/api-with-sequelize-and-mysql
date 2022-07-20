const Sequelize = require("sequelize");
const { MatriculasServices } = require("../services");
const matriculasServices = new MatriculasServices();

class MatriculaController {
  static async getMatriculasByTurma(req, res) {
    const { turmaId } = req.params;
    try {
      const matriculas = await matriculasServices.getAndCountRecords(
        {
          turmaId: Number(turmaId),
          status: "confirmado",
        },
        {
          limit: 20,
          order: [["estudanteId", "ASC"]],
        }
      );
      return res.status(200).json(matriculas);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async getTurmasLotadas(_, res) {
    const maxByTurma = 2;
    try {
      const turmasLotadas = await matriculasServices.getAndCountRecords(
        {
          status: "confirmado",
        },
        {
          attributes: ["turmaId"],
          group: ["turmaId"],
          having: Sequelize.literal(`count(turmaId) >= ${maxByTurma}`),
        }
      );
      return res.status(200).json(turmasLotadas ? turmasLotadas.count : null);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async getMatriculaById(req, res) {
    const { estudanteId, matriculaId } = req.params;
    try {
      const matricula = await matriculasServices.getRecordById({
        id: Number(matriculaId),
        estudanteId: Number(estudanteId),
      });
      return res.status(200).json(matricula);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async createMatricula(req, res) {
    const { estudanteId } = req.params;
    const newMatricula = { ...req.body, estudanteId: Number(estudanteId) };
    try {
      const matricula = await matriculasServices.createRecord(newMatricula);
      return res.status(201).json(matricula);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async updateMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;
    const newData = req.body;
    try {
      await matriculasServices.updateRecords(newData, {
        where: { id: Number(matriculaId), estudanteId: Number(estudanteId) },
      });
      const updatedMatricula = await matriculasServices.getRecordById({
        id: Number(matriculaId),
        estudanteId: Number(estudanteId),
      });
      return res.status(200).json(updatedMatricula);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async deleteMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;
    try {
      await matriculasServices.deleteRecord({
        id: Number(matriculaId),
        estudanteId: Number(estudanteId),
      });
      return res
        .status(200)
        .json({ message: `Id ${matriculaId} excluído com sucesso.` });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async restoreMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;
    try {
      await matriculasServices.restoreRecord({
        id: Number(matriculaId),
        estudanteId: Number(estudanteId),
      });
      return res
        .status(200)
        .json({ message: `Id ${matriculaId} restaurado com sucesso.` });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
}

module.exports = MatriculaController;
