/**
 * Interface para gerenciar o repositório de eventos do Kafka
 */
export interface IKafkaEventPublisher {
  /**
   * Publica um evento no Kafka
   * @param topic - Nome do tópico
   * @param key - Chave da mensagem (geralmente o ID da entidade)
   * @param payload - Dados da mensagem
   */
  publish(topic: string, key: string, payload: any): void;
}
