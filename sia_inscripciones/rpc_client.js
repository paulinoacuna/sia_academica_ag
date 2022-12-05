#!/usr/bin/env node

import { connect } from "amqplib";

export async function callRpc(message) {
  const queue = "rpc_queue";
  return new Promise((resolve, reject) => {
    connect("amqp://rabbit-mq").then((conn) => {
      conn.createChannel().then((ch) => {
        ch.assertQueue("", { exclusive: true }).then((q) => {
          const correlationId = generateUuid();
          let body = JSON.stringify(message);

          console.log(" [x] Requesting inscripción");

          ch.consume(
            q.queue,
            (msg) => {
              if (msg.properties.correlationId === correlationId) {
                console.log(" [.] Got %s", msg.content.toString());
                setTimeout(() => {
                  conn.close();
                  let message = JSON.parse(msg.content);
                  resolve(JSON.parse(message.message));
                }, 500);
              }
            },
            { noAck: true }
          );

          ch.sendToQueue(queue, Buffer.from(body), {
            correlationId: correlationId,
            replyTo: q.queue,
          });
        });
      });
    });
  });
}

function generateUuid() {
  return (
    Math.random().toString() +
    Math.random().toString() +
    Math.random().toString()
  );
}
