import app from "./app";
import { kafkaProducer } from "./infrastructure/messaging/kafka-producer";

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await kafkaProducer.connect();
    console.log("Conectado ao Kafka");

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
      console.log(`Documentação disponível em http://localhost:${PORT}/docs`);
    });
  } catch (error) {
    console.error("Erro ao iniciar aplicação:", error);
    process.exit(1);
  }
}

start();
