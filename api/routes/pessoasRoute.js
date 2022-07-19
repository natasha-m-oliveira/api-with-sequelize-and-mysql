const { Router } = require("express");
const PessoaController = require("../controllers/PessoaController");

const router = Router();
router.get("/pessoas", PessoaController.getAllPessoas);
router.get("/pessoas/:id", PessoaController.getPessoaById);
router.post("/pessoas", PessoaController.createPessoa);
router.post("/pessoas/:id/restaura", PessoaController.restorePessoa);
router.put("/pessoas/:id", PessoaController.updatePessoa);
router.delete("/pessoas/:id", PessoaController.deletePessoa);
router.get(
  "/pessoas/:estudanteId/matricula/:matriculaId",
  PessoaController.getMatriculaById
);
router.post(
  "/pessoas/:estudanteId/matricula",
  PessoaController.createMatricula
);
router.post("/pessoas/:estudanteId/matricula/:matriculaId/restaura", PessoaController.restoreMatricula);
router.put(
  "/pessoas/:estudanteId/matricula/:matriculaId",
  PessoaController.updateMatricula
);
router.put(
  "/pessoas/:estudanteId/matricula/:matriculaId",
  PessoaController.updateMatricula
);
router.delete(
  "/pessoas/:estudanteId/matricula/:matriculaId",
  PessoaController.deleteMatricula
);

module.exports = router;
