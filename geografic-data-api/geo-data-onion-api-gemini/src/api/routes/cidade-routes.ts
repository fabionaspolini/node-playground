import { Router } from "express";
import { CidadeController } from "../controllers/cidade-controller";
import { CidadeUseCase } from "../../application/use-cases/cidade-use-case";
import { PrismaCidadeRepository } from "../../infrastructure/repositories/prisma-cidade-repository";
import { kafkaProducer } from "../../infrastructure/messaging/kafka-producer";

const router = Router();
const repository = new PrismaCidadeRepository();
const useCase = new CidadeUseCase(repository, kafkaProducer);
const controller = new CidadeController(useCase);

router.post("/cidades", (req, res) => controller.create(req, res));
router.get("/cidades/:id", (req, res) => controller.getById(req, res));
router.get("/cidades", (req, res) => controller.list(req, res));
router.put("/cidades/:id", (req, res) => controller.update(req, res));
router.delete("/cidades/:id", (req, res) => controller.delete(req, res));

export default router;
