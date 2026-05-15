import express from "express";
import swaggerUi from "swagger-ui-express";
import paisRoutes from "./api/routes/pais-routes";
import estadoRoutes from "./api/routes/estado-routes";
import cidadeRoutes from "./api/routes/cidade-routes";
import { authMiddleware } from "./api/middlewares/auth";
import { swaggerDocument } from "./api/docs";

const app = express();

app.use(express.json());

// Filtro global de autenticação (comentado internamente)
app.use(authMiddleware);

// Rotas
app.use(paisRoutes);
app.use(estadoRoutes);
app.use(cidadeRoutes);

// Documentação Swagger/OpenAPI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
