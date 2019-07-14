import * as amqp from 'amqplib';

export async function subscribe(exchange: string, routingKey: string, ack: boolean, handler: (msg: amqp.ConsumeMessage | null) => void) {
  try {
    const connection = await amqp.connect('amqp://localhost:5672');
    const channel = await connection.createChannel();
    channel.assertExchange(exchange, 'topic', {
      durable: false
    });

    const q = await channel.assertQueue('', {
      exclusive: true
    });
    await channel.bindQueue(q.queue, exchange, routingKey);
    await channel.consume(q.queue, handler, {
      noAck: !ack
    });
  } catch (err) {
    throw err;
  }
}