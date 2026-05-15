import { Router } from "express";
import { PaisController } from "../controllers/pais-controller";
import { PaisUseCase } from "../../application/use-cases/pais-use-case";
import { PrismaPaisRepository } from "../../infrastructure/repositories/prisma-pais-repository";
import { kafkaProducer } from "../../infrastructure/messaging/kafka-producer";

const router = Router();
const repository = new PrismaPaisRepository();
const useCase = new PaisUseCase(repository, kafkaProducer);
const controller = new PaisController(useCase);

router.post("/paises", (req, res) => controller.create(req, res));
router.get("/paises/:id", (req, res) => controller.getById(req, res));
router.get("/paises", (req, res) => controller.list(req, res));
router.put("/paises/:id", (req, res) => controller.update(req, res));
router.delete("/paises/:id", (req, res) => controller.delete(req, res));

export default router;
