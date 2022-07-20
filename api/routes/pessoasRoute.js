const { Router } = require("express");
const PessoaController = require("../controllers/PessoaController");
const MatriculaController = require("../controllers/MatriculaController");

const router = Router();
router.get("/pessoas", PessoaController.getAllPessoas);
router.get("/pessoas/ativas", PessoaController.getAllActivePessoas);
router.get("/pessoas/:id", PessoaController.getPessoaById);
router.get(
  "/pessoas/:estudanteId/matriculas",
  PessoaController.getAllMatriculas
);
router.get(
  "/pessoas/matriculas/:turmaId/confirmadas",
  MatriculaController.getMatriculasByTurma
);
router.get(
  "/pessoas/:estudanteId/matriculas/:matriculaId",
  MatriculaController.getMatriculaById
);
router.get("/pessoas/matriculas/lotadas", MatriculaController.getTurmasLotadas);
router.post("/pessoas", PessoaController.createPessoa);
router.post("/pessoas/:id/restaura", PessoaController.restorePessoa);
router.post(
  "/pessoas/:estudanteId/matriculas",
  MatriculaController.createMatricula
);
router.post(
  "/pessoas/:estudanteId/matriculas/:matriculaId/restaura",
  MatriculaController.restoreMatricula
);
router.post("/pessoas/:estudanteId/cancela", PessoaController.cancelaPessoa);
router.put("/pessoas/:id", PessoaController.updatePessoa);
router.put(
  "/pessoas/:estudanteId/matriculas/:matriculaId",
  MatriculaController.updateMatricula
);
router.delete("/pessoas/:id", PessoaController.deletePessoa);
router.delete(
  "/pessoas/:estudanteId/matriculas/:matriculaId",
  MatriculaController.deleteMatricula
);

module.exports = router;
