import { Kafka, Producer } from "kafkajs";

export class KafkaProducer {
  private producer: Producer;

  constructor() {
    const kafka = new Kafka({
      clientId: "geografia-api",
      brokers: [process.env.KAFKA_BROKERS || "localhost:9092"],
    });
    this.producer = kafka.producer();
  }

  async connect() {
    await this.producer.connect();
  }

  async disconnect() {
    await this.producer.disconnect();
  }

  /**
   * Produz uma mensagem no Kafka.
   * Emula o comportamento solicitado de ter um callback para logar falhas.
   */
  produce(topic: string, key: string, payload: any) {
    this.producer
      .send({
        topic,
        messages: [{ key, value: JSON.stringify(payload) }],
      })
      .then((record) => {
        // Sucesso
      })
      .catch((err) => {
        console.error(`Falha ao produzir mensagem no tópico ${topic}:`, err);
      });
  }
}

export const kafkaProducer = new KafkaProducer();
