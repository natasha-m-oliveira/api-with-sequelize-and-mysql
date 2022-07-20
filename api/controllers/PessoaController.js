const { PessoasServices } = require("../services");
const pessoasServices = new PessoasServices();

class PessoaController {
  static async getAllPessoas(_, res) {
    try {
      const pessoas = await pessoasServices.getAllRecords();
      return res.status(200).json(pessoas);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async getAllActivePessoas(_, res) {
    try {
      const activePessoas = await pessoasServices.getActiveRecords();
      return res.status(200).json(activePessoas);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async getPessoaById(req, res) {
    const { id } = req.params;
    try {
      const pessoa = await pessoasServices.getRecordById({ id: Number(id) });
      return res.status(200).json(pessoa);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async getAllMatriculas(req, res) {
    const { estudanteId } = req.params;
    try {
      const pessoa = await pessoasServices.getRecordById({
        id: Number(estudanteId),
      });
      const matriculas = await pessoa.getAulasMatriculadas();
      return res.status(200).json(matriculas);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async createPessoa(req, res) {
    const newPessoa = req.body;
    try {
      const pessoa = await pessoasServices.createRecord(newPessoa);
      return res.status(201).json(pessoa);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async updatePessoa(req, res) {
    const { id } = req.params;
    const newData = req.body;
    try {
      await pessoasServices.updateRecord(newData, id);
      const updatedPessoa = await pessoasServices.getRecordById({
        id: Number(id),
      });
      return res.status(200).json(updatedPessoa);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async deletePessoa(req, res) {
    const { id } = req.params;
    try {
      await pessoasServices.deleteRecord({
        id: Number(id),
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
      await pessoasServices.cancelaPessoaEMatriculas(estudanteId);
      return res.status(200).json({
        message: `Matriculas ref. estudante ${estudanteId} canceladas com sucesso.`,
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async restorePessoa(req, res) {
    const { id } = req.params;
    try {
      await pessoasServices.restoreRecord({ id: Number(id) });
      return res
        .status(200)
        .json({ message: `Id ${id} restaurado com sucesso.` });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
}

module.exports = PessoaController;
