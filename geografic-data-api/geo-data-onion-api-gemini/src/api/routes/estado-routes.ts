import { Router } from "express";
import { EstadoController } from "../controllers/estado-controller";
import { EstadoUseCase } from "../../application/use-cases/estado-use-case";
import { PrismaEstadoRepository } from "../../infrastructure/repositories/prisma-estado-repository";
import { kafkaProducer } from "../../infrastructure/messaging/kafka-producer";

const router = Router();
const repository = new PrismaEstadoRepository();
const useCase = new EstadoUseCase(repository, kafkaProducer);
const controller = new EstadoController(useCase);

router.post("/estados/post", (req, res) => controller.create(req, res));
router.get("/estados/get/:id", (req, res) => controller.getById(req, res));
router.get("/estados/get", (req, res) => controller.list(req, res));
router.put("/estados/put/:id", (req, res) => controller.update(req, res));
router.delete("/estados/delete/:id", (req, res) => controller.delete(req, res));

export default router;
