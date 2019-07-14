import * as amqp from 'amqplib';

export async function publish(exchange: string,
  routingKey: string,
  msg: string,
  delay?: number) {
  try {
    const connection = await amqp.connect('amqp://localhost:5672');
    const channel = await connection.createChannel()
    const delayedChannel = await connection.createChannel();

    await channel.assertExchange(exchange, 'topic', {
      durable: false
    });

    if (delay) {
      await channel.assertExchange(exchange + '_delayed', 'topic', {
        durable: false
      });

      const qDelayed = await delayedChannel.assertQueue('', {
        deadLetterExchange: exchange,
        deadLetterRoutingKey: routingKey,
        messageTtl: delay,
        exclusive: true
      });
      await delayedChannel.bindQueue(qDelayed.queue, exchange + '_delayed', routingKey);
    }

    if(delay) {
      await delayedChannel.publish(`${exchange}_delayed`, routingKey, Buffer.from(msg));
    } else {
      await channel.publish(exchange, routingKey, Buffer.from(msg));
    }
    console.log('MESSAGE PUBLISHED AT ', new Date().toISOString());
  } catch (err) {
    throw err;
  }
}