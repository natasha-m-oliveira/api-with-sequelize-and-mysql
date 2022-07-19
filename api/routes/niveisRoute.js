const { Router } = require("express");
const NivelController = require("../controllers/NivelController");

const router = Router();
router.get("/niveis", NivelController.getAllNiveis);
router.get("/niveis/:id", NivelController.getNivelById);
router.post("/niveis", NivelController.createNivel);
router.post("/niveis/:id/restaura", NivelController.restoreNivel);
router.put("/niveis/:id", NivelController.updateNivel);
router.delete("/niveis/:id", NivelController.deleteNivel);

module.exports = router;
