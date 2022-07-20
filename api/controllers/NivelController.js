const { NiveisServices } = require("../services");
const niveisServices = new NiveisServices();

class NivelController {
  static async getAllNiveis(_, res) {
    try {
      const niveis = await niveisServices.getAllRecords();
      return res.status(200).json(niveis);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async getNivelById(req, res) {
    try {
      const { id } = req.params;
      const nivel = await niveisServices.getRecordById({ id: Number(id) });
      return res.status(200).json(nivel);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async createNivel(req, res) {
    try {
      const newNivel = req.body;
      const nivel = await niveisServices.createRecord(newNivel);
      return res.status(201).json(nivel);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async updateNivel(req, res) {
    try {
      const { id } = req.params;
      const newData = req.body;
      await niveisServices.updateRecord(newData, id);
      const updatedNivel = await niveisServices.getRecordById({ id: Number(id) });
      return res.status(200).json(updatedNivel);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async deleteNivel(req, res) {
    try {
      const { id } = req.params;
      await niveisServices.deleteRecord({ id: Number(id) });
      return res
        .status(200)
        .json({ message: `Id ${id} excluído com sucesso.` });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async restoreNivel(req, res) {
    try {
      const { id } = req.params;
      await niveisServices.restoreRecord({ id: Number(id) });
      return res
        .status(200)
        .json({ message: `Id ${id} restaurado com sucesso.` });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
}

module.exports = NivelController;
