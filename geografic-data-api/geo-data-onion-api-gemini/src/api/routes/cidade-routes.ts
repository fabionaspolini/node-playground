import { Router } from "express";
import { CidadeController } from "../controllers/cidade-controller";
import { CidadeUseCase } from "../../application/use-cases/cidade-use-case";
import { PrismaCidadeRepository } from "../../infrastructure/repositories/prisma-cidade-repository";
import { kafkaProducer } from "../../infrastructure/messaging/kafka-producer";

const router = Router();
const repository = new PrismaCidadeRepository();
const useCase = new CidadeUseCase(repository, kafkaProducer);
const controller = new CidadeController(useCase);

router.post("/cidades/post", (req, res) => controller.create(req, res));
router.get("/cidades/get/:id", (req, res) => controller.getById(req, res));
router.get("/cidades/get", (req, res) => controller.list(req, res));
router.put("/cidades/put/:id", (req, res) => controller.update(req, res));
router.delete("/cidades/delete/:id", (req, res) => controller.delete(req, res));

export default router;
