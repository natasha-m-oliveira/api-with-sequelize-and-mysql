const { Router } = require("express");
const TurmaController = require("../controllers/TurmaController");

const router = Router();
router.get("/turmas", TurmaController.getAllTurmas);
router.get("/turmas/:id", TurmaController.getTurmaById);
router.post("/turmas", TurmaController.createTurma);
router.put("/turmas/:id", TurmaController.updateTurma);
router.delete("/turmas/:id", TurmaController.deleteTurma);

module.exports = router;
