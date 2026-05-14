import Kafka from '@confluentinc/kafka-javascript';

const producer = new Kafka.Producer({
  'bootstrap.servers': process.env.KAFKA_BOOTSTRAP ?? 'localhost:9092'
});

producer.connect();

export const publishEvent = (topic: string, key: string, payload: unknown) => {
  producer.produce(
    topic,
    null,
    Buffer.from(JSON.stringify(payload)),
    key,
    Date.now(),
    (err) => {
      if (err) {
        console.error('Kafka publish error', err);
      }
    }
  );
};