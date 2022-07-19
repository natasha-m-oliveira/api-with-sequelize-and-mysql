const database = require("../models");

class NivelController {
  static async getAllNiveis(_, res) {
    try {
      const niveis = await database.Niveis.findAll();
      return res.status(200).json(niveis);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async getNivelById(req, res) {
    try {
      const { id } = req.params;
      const nivel = await database.Niveis.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(nivel);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async createNivel(req, res) {
    try {
      const newNivel = req.body;
      const nivel = await database.Niveis.create(newNivel);
      return res.status(201).json(nivel);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async restoreNivel(req, res) {
    try {
      const { id } = req.params;
      await database.Niveis.restore({ where: { id: Number(id) } });
      return res
        .status(200)
        .json({ message: `Id ${id} restaurado com sucesso.` });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async updateNivel(req, res) {
    try {
      const { id } = req.params;
      const newData = req.body;
      await database.Niveis.update(newData, {
        where: { id: Number(id) },
      });
      const updatedNivel = await database.Niveis.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(updatedNivel);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async deleteNivel(req, res) {
    try {
      const { id } = req.params;
      await database.Niveis.destroy({
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

module.exports = NivelController;
