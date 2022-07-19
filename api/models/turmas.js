"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Turmas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Turmas.hasMany(models.Matriculas, { foreignKey: "turmaId" });
      Turmas.belongsTo(models.Pessoas, { foreignKey: "docenteId" });
      Turmas.belongsTo(models.Niveis, { foreignKey: "nivelId" });
    }
  }
  Turmas.init(
    {
      dataInicio: DataTypes.DATEONLY,
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Turmas",
    }
  );
  return Turmas;
};
