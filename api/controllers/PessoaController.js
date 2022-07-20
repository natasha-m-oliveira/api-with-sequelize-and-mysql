const database = require("../models");
const Sequelize = require("sequelize");

class PessoaController {
  static async getAllPessoas(_, res) {
    try {
      const pessoas = await database.Pessoas.scope("todos").findAll();
      return res.status(200).json(pessoas);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async getAllActivePessoas(_, res) {
    try {
      const activePessoas = await database.Pessoas.findAll();
      return res.status(200).json(activePessoas);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async getPessoaById(req, res) {
    const { id } = req.params;
    try {
      const pessoa = await database.Pessoas.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(pessoa);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async createPessoa(req, res) {
    const newPessoa = req.body;
    try {
      const pessoa = await database.Pessoas.create(newPessoa);
      return res.status(201).json(pessoa);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async updatePessoa(req, res) {
    const { id } = req.params;
    const newData = req.body;
    try {
      await database.Pessoas.update(newData, {
        where: { id: Number(id) },
      });
      const updatedPessoa = await database.Pessoas.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(updatedPessoa);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async deletePessoa(req, res) {
    const { id } = req.params;
    try {
      await database.Pessoas.destroy({
        where: { id: Number(id) },
      });
      return res
        .status(200)
        .json({ message: `Id ${id} excluído com sucesso.` });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async cancelaPessoa(req, res) {
    const { estudanteId } = req.params;
    try {
      database.sequelize.transaction(async (transaction) => {
        await database.Pessoas.update(
          { ativo: false },
          { where: { id: Number(estudanteId) } },
          { transaction }
        );
        await database.Matriculas.update(
          { status: "cancelado" },
          { where: { estudanteId: Number(estudanteId) } },
          { transaction }
        );
        return res.status(200).json({
          message: `Matriculas ref. estudante ${estudanteId} canceladas com sucesso.`,
        });
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async restorePessoa(req, res) {
    const { id } = req.params;
    try {
      await database.Pessoas.restore({ where: { id: Number(id) } });
      return res
        .status(200)
        .json({ message: `Id ${id} restaurado com sucesso.` });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async getAllMatriculas(req, res) {
    const { estudanteId } = req.params;
    try {
      const pessoa = await database.Pessoas.findOne({
        where: { id: Number(estudanteId) },
      });
      const matriculas = await pessoa.getAulasMatriculadas();
      return res.status(200).json(matriculas);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async getMatriculasByTurma(req, res) {
    const { turmaId } = req.params;
    try {
      const matriculas = await database.Matriculas.findAndCountAll({
        where: {
          turmaId: Number(turmaId),
          status: "confirmado",
        },
        limit: 20,
        order: [["estudanteId", "ASC"]],
      });
      return res.status(200).json(matriculas);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async getTurmasLotadas(req, res) {
    const maxByTurma = 2;
    try {
      const turmasLotadas = await database.Matriculas.findAndCountAll({
        where: {
          status: "confirmado",
        },
        attributes: ["turmaId"],
        group: ["turmaId"],
        having: Sequelize.literal(`count(turmaId) >= ${maxByTurma}`),
      });
      return res.status(200).json(turmasLotadas.count);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async getMatriculaById(req, res) {
    const { estudanteId, matriculaId } = req.params;
    try {
      const matricula = await database.Matriculas.findOne({
        where: {
          id: Number(matriculaId),
          estudanteId: Number(estudanteId),
        },
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
      const matricula = await database.Matriculas.create(newMatricula);
      return res.status(201).json(matricula);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async restoreMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;
    try {
      await database.Matriculas.restore({
        where: { id: Number(matriculaId), estudanteId: Number(estudanteId) },
      });
      return res
        .status(200)
        .json({ message: `Id ${matriculaId} restaurado com sucesso.` });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async updateMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;
    const newData = req.body;
    try {
      await database.Matriculas.update(newData, {
        where: { id: Number(matriculaId), estudanteId: Number(estudanteId) },
      });
      const updatedMatricula = await database.Matriculas.findOne({
        where: { id: Number(matriculaId) },
      });
      return res.status(200).json(updatedMatricula);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async deleteMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;
    try {
      await database.Matriculas.destroy({
        where: { id: Number(matriculaId), estudanteId: Number(estudanteId) },
      });
      return res
        .status(200)
        .json({ message: `Id ${matriculaId} excluído com sucesso.` });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
}

module.exports = PessoaController;
