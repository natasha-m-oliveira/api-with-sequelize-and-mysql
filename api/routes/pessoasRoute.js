const { Router } = require("express");
const PessoaController = require("../controllers/PessoaController");

const router = Router();
router.get("/pessoas/todos", PessoaController.getAllPessoas);
router.get("/pessoas", PessoaController.getAllActivePessoas);
router.get("/pessoas/:id", PessoaController.getPessoaById);
router.get(
  "/pessoas/:estudanteId/matriculas",
  PessoaController.getAllMatriculas
);
router.get(
  "/pessoas/:estudanteId/matriculas/:matriculaId",
  PessoaController.getMatriculaById
);
router.post("/pessoas", PessoaController.createPessoa);
router.post("/pessoas/:id/restaura", PessoaController.restorePessoa);
router.post(
  "/pessoas/:estudanteId/matriculas",
  PessoaController.createMatricula
);
router.post(
  "/pessoas/:estudanteId/matriculas/:matriculaId/restaura",
  PessoaController.restoreMatricula
);
router.put("/pessoas/:id", PessoaController.updatePessoa);
router.put(
  "/pessoas/:estudanteId/matriculas/:matriculaId",
  PessoaController.updateMatricula
);
router.delete("/pessoas/:id", PessoaController.deletePessoa);
router.delete(
  "/pessoas/:estudanteId/matriculas/:matriculaId",
  PessoaController.deleteMatricula
);

module.exports = router;
