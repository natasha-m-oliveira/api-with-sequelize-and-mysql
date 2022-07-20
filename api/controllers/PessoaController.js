const database = require("../models");

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
    try {
      const { id } = req.params;
      const pessoa = await database.Pessoas.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(pessoa);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async createPessoa(req, res) {
    try {
      const newPessoa = req.body;
      const pessoa = await database.Pessoas.create(newPessoa);
      return res.status(201).json(pessoa);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async updatePessoa(req, res) {
    try {
      const { id } = req.params;
      const newData = req.body;
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
    try {
      const { id } = req.params;
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

  static async restorePessoa(req, res) {
    try {
      const { id } = req.params;
      await database.Pessoas.restore({ where: { id: Number(id) } });
      return res
        .status(200)
        .json({ message: `Id ${id} restaurado com sucesso.` });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async getAllMatriculas(req, res) {
    try {
      const { estudanteId } = req.params;
      const pessoa = await database.Pessoas.findOne({
        where: { id: Number(estudanteId) },
      });
      const matriculas = await pessoa.getAulasMatriculadas();
      return res.status(200).json(matriculas);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async getMatriculaById(req, res) {
    try {
      const { estudanteId, matriculaId } = req.params;
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
    try {
      const { estudanteId } = req.params;
      const newMatricula = { ...req.body, estudanteId: Number(estudanteId) };
      const matricula = await database.Matriculas.create(newMatricula);
      return res.status(201).json(matricula);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async restoreMatricula(req, res) {
    try {
      const { estudanteId, matriculaId } = req.params;
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
    try {
      const { estudanteId, matriculaId } = req.params;
      const newData = req.body;
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
    try {
      const { estudanteId, matriculaId } = req.params;
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
