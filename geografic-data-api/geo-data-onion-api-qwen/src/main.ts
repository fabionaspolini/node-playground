import "reflect-metadata";
import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import cors from "cors";

// Importar camadas
import { DatabaseContext } from "./Infrastructure/Database/DatabaseContext";
import { KafkaProducer } from "./Infrastructure/Kafka/KafkaProducer";
import { UnitOfWork } from "./Infrastructure/UnitOfWork/UnitOfWork";
import { PrismaClient } from "./Infrastructure/Database/PrismaClient";
import { PaisRepository } from "./Infrastructure/Repositories/PaisRepository";
import { EstadoRepository } from "./Infrastructure/Repositories/EstadoRepository";
import { CidadeRepository } from "./Infrastructure/Repositories/CidadeRepository";
import { PaisService } from "./Application/Services/PaisService";
import { EstadoService } from "./Application/Services/EstadoService";
import { CidadeService } from "./Application/Services/CidadeService";
import { PaisRouter } from "./API/Routers/PaisRouter";
import { EstadoRouter } from "./API/Routers/EstadoRouter";
import { CidadeRouter } from "./API/Routers/CidadeRouter";
import { JWTAuthMiddleware } from "./API/Middleware/JWTAuthMiddleware";

// Configurar ambiente
dotenv.config();

// Configurações
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "default-secret-change-in-production";
const KAFKA_BROKERS = process.env.KAFKA_BROKERS || "localhost:9092";

// Inicializar contextos
const databaseContext = new DatabaseContext();
const prismaClient = databaseContext.prisma;
const unitOfWork = new UnitOfWork(prismaClient);

// Inicializar Kafka Producer
const kafkaProducer = new KafkaProducer(KAFKA_BROKERS.split(","));

// Inicializar repositórios
const paisRepository = new PaisRepository(prismaClient);
const estadoRepository = new EstadoRepository(prismaClient);
const cidadeRepository = new CidadeRepository(prismaClient);

// Inicializar serviços
const paisService = new PaisService(paisRepository);
const estadoService = new EstadoService(estadoRepository);
const cidadeService = new CidadeService(cidadeRepository);

// Configurar Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Geo Data API",
      version: "1.0.0",
      description: "API de Dados Geográficos com Onion Architecture",
      contact: {
        name: "API Support",
        email: "support@example.com"
      }
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: "Development server"
      }
    ],
    components: {
      schemas: {
        Pais: {
          type: "object",
          properties: {
            id: { type: "string", description: "Country identifier in ISO 3166-1 alpha-2 format", example: "BR" },
            nome: { type: "string", description: "Common country name", example: "Brasil" },
            codigoISO3: { type: "string", description: "ISO 3166-1 alpha-3 country code", example: "BRA" },
            codigoONU: { type: "integer", description: "United Nations numeric code", example: 76 },
            codigoDDI: { type: "string", description: "Dialing code (DDI)", example: "+55" },
            codigoMoeda: { type: "string", description: "Currency code (ISO 4217)", example: "BRL" },
            defaultLocale: { type: "string", description: "Main language/locale", example: "pt-BR" },
            ativo: { type: "boolean", description: "Indicates if the record is active", default: true },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" }
          },
          required: ["id", "nome", "codigoISO3", "codigoONU", "codigoDDI", "codigoMoeda", "defaultLocale"]
        },
        Estado: {
          type: "object",
          properties: {
            id: { type: "string", description: "State identifier in ISO 3166-2 format", example: "BR-SP" },
            paisId: { type: "string", description: "Country identifier", example: "BR" },
            nome: { type: "string", description: "State name", example: "São Paulo" },
            sigla: { type: "string", description: "State abbreviation", example: "SP" },
            tipo: { type: "string", enum: ["STATE", "PROVINCE", "DEPARTMENT", "DISTRICT"], example: "STATE" },
            ativo: { type: "boolean", description: "Indicates if the record is active", default: true },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" }
          },
          required: ["id", "paisId", "nome", "sigla", "tipo"]
        },
        Cidade: {
          type: "object",
          properties: {
            id: { type: "string", description: "City identifier (UUID v7)", format: "uuid", example: "123e4567-e89b-12d3-a456-426614174000" },
            estadoId: { type: "string", description: "State identifier", example: "BR-SP" },
            nome: { type: "string", description: "City name", example: "São Paulo" },
            codigoPostal: { type: "string", description: "Postal code (CEP/Zip)", example: "01000-000" },
            latitude: { type: "number", description: "Latitude coordinate", example: -23.55052 },
            longitude: { type: "number", description: "Longitude coordinate", example: -46.633308 },
            ativo: { type: "boolean", description: "Indicates if the record is active", default: true },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" }
          },
          required: ["id", "estadoId", "nome"]
        }
      },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ["./src/API/Routers/*.ts"]
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Configurar aplicação Express
const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

/**
 * Endpoint raiz
 */
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Geo Data API - API de Dados Geográficos",
    version: "1.0.0",
    endpoints: {
      documentacao: "/docs",
      paises: "/cidades",
      estados: "/estados",
      cidades: "/cidades"
    }
  });
});

/**
 * Endpoint de documentação (Swagger)
 */
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middlewares de autenticação
app.use(JWTAuthMiddleware(JWT_SECRET));

// Inicializar routers (sem controllers)
const paisRouter = new PaisRouter(paisService);
const estadoRouter = new EstadoRouter(estadoService);
const cidadeRouter = new CidadeRouter(cidadeService);

// Rotas
app.use("/paises", paisRouter.getRouter());
app.use("/estados", estadoRouter.getRouter());
app.use("/cidades", cidadeRouter.getRouter());

// Inicializar conexões
async function bootstrap() {
  try {
    // Conectar ao banco de dados
    await databaseContext.initialize();

    // Conectar ao Kafka
    await kafkaProducer.initialize();

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
      console.log(`Documentação disponível em http://localhost:${PORT}/docs`);
    });

    // Lidar com mensagens Kafka
    const consumeMessages = async () => {
      // Implementar consumer Kafka se necessário
    };

    // Iniciar consumer
    consumeMessages();

    // Lidar com desligamento gracefully
    const gracefulShutdown = async () => {
      console.log("Desligando a aplicação...");
      await databaseContext.disconnect();
      await kafkaProducer.disconnect();
      process.exit(0);
    };

    process.on("SIGTERM", gracefulShutdown);
    process.on("SIGINT", gracefulShutdown);
  } catch (error) {
    console.error("Erro ao inicializar a aplicação:", error);
    process.exit(1);
  }
}

bootstrap();
