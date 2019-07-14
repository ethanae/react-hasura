import * as amqp from 'amqplib';

export async function publish(exchange: string, routingKey: string, msg: string) {
  try {
    const connection = await amqp.connect('amqp://localhost:5672');
    const channel = await connection.createChannel();
    channel.assertExchange(exchange, 'topic', {
      durable: false
    });
    await channel.publish(exchange, routingKey, Buffer.from(msg));
  } catch (err) {
    throw err;
  }
}