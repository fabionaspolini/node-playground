import { Kafka } from "kafkajs";
import { IKafkaProducer } from "./IKafkaProducer";

/**
 * Implementação do produtor Kafka
 */
export class KafkaProducer implements IKafkaProducer {
  private readonly _producer: any;
  private readonly _kafka: Kafka;

  /**
   * Cria nova instância do produtor Kafka
   * @param brokers - Lista de brokers do Kafka
   */
  constructor(brokers: string[]) {
    this._kafka = new Kafka({
      clientId: "geo-data-api",
      brokers
    });
    this._producer = this._kafka.producer();
  }

  /**
   * Inicializa o produtor
   */
  public async initialize(): Promise<void> {
    await this._producer.connect();
    console.log("Conectado ao Kafka com sucesso");
  }

  /**
   * Desconecta o produtor
   */
  public async disconnect(): Promise<void> {
    await this._producer.disconnect();
    console.log("Desconectado do Kafka");
  }

  /**
   * Publica uma mensagem no Kafka
   * @param topic - Nome do tópico
   * @param key - Chave da mensagem
   * @param value - Valor da mensagem (JSON string)
   * @param callback - Callback para manipular erros
   */
  public produce(
    topic: string,
    key: string,
    value: string,
    callback: (err: any, result: any) => void
  ): void {
    this._producer
      .send({
        topic,
        messages: [
          {
            key,
            value
          }
        ]
      })
      .then((result: any) => {
        callback(null, result);
      })
      .catch((err: any) => {
        callback(err, null);
      });
  }

  /**
   * Publica um evento de país
   * @param action - Ação (create, update, delete)
   * @param id - ID do país
   * @param data - Dados do país
   */
  public publishPaisEvent(
    action: "create" | "update" | "delete",
    id: string,
    data: any
  ): void {
    const topic = "geografia.pais";
    const key = id;
    const message = JSON.stringify({
      action,
      id,
      data,
      timestamp: new Date().toISOString()
    });

    this.produce(topic, key, message, (err, result) => {
      if (err) {
        console.error(`Falha ao produzir evento de país: ${err.message}`);
      } else {
        console.log(`Evento de país produzido com sucesso: ${result}`);
      }
    });
  }

  /**
   * Publica um evento de estado
   * @param action - Ação (create, update, delete)
   * @param id - ID do estado
   * @param data - Dados do estado
   */
  public publishEstadoEvent(
    action: "create" | "update" | "delete",
    id: string,
    data: any
  ): void {
    const topic = "geografia.estado";
    const key = id;
    const message = JSON.stringify({
      action,
      id,
      data,
      timestamp: new Date().toISOString()
    });

    this.produce(topic, key, message, (err, result) => {
      if (err) {
        console.error(`Falha ao produzir evento de estado: ${err.message}`);
      } else {
        console.log(`Evento de estado produzido com sucesso: ${result}`);
      }
    });
  }

  /**
   * Publica um evento de cidade
   * @param action - Ação (create, update, delete)
   * @param id - ID da cidade
   * @param data - Dados da cidade
   */
  public publishCidadeEvent(
    action: "create" | "update" | "delete",
    id: string,
    data: any
  ): void {
    const topic = "geografia.cidade";
    const key = id;
    const message = JSON.stringify({
      action,
      id,
      data,
      timestamp: new Date().toISOString()
    });

    this.produce(topic, key, message, (err, result) => {
      if (err) {
        console.error(`Falha ao produzir evento de cidade: ${err.message}`);
      } else {
        console.log(`Evento de cidade produzido com sucesso: ${result}`);
      }
    });
  }
}
