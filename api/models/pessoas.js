"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pessoas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pessoas.hasMany(models.Turmas, { foreignKey: "docenteId" });
      Pessoas.hasMany(models.Matriculas, {
        foreignKey: "estudanteId",
        scope: { status: "confirmado" },
        as: "aulasMatriculadas"
      });
    }
  }
  Pessoas.init(
    {
      nome: {
        type: DataTypes.STRING,
        validate: {
          isName: function (data) {
            if (data.length < 3)
              throw new Error("O campo nome deve ter pelo menos 3 caracteres.");
          },
        },
      },
      ativo: DataTypes.BOOLEAN,
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            args: true,
            msg: "O campo email deve ser um endereço de e-mail válido.",
          },
        },
      },
      role: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      defaultScope: {
        where: { ativo: true },
      },
      scopes: {
        todos: { where: {} },
      },
      modelName: "Pessoas",
    }
  );
  return Pessoas;
};
