/**
 * Interface para publicar eventos no Kafka
 */
export interface IKafkaProducer {
  /**
   * Publica uma mensagem no Kafka
   * @param topic - Nome do tópico
   * @param key - Chave da mensagem
   * @param value - Valor da mensagem
   * @param callback - Callback para manipular erros
   */
  produce(topic: string, key: string, value: string, callback: (err: any, result: any) => void): void;
}
