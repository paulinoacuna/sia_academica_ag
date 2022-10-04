#!/usr/bin/env node

import { connect } from "amqplib/callback_api.js";
import { json } from "express";

export class RpcClient {
  constructor() {
    this.response = {
      message: "",
    };
  }

  async call(message) {
    callRpc(message, this.response);
  }

  getResponse() {
    let json = JSON.parse(this.response.message);
    return JSON.parse(json.message);
  }
}

async function callRpc(message, response) {
  connect("amqp://localhost", function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        console.log("error1");
        throw error1;
      }
      channel.assertQueue(
        "",
        {
          exclusive: true,
        },
        function (error2, q) {
          if (error2) {
            console.log("error2", error2);
            throw error2;
          }
          let correlationId = generateUuid();
          let body = JSON.stringify(message);

          console.log(" [x] Requesting inscripción");

          channel.consume(
            q.queue,
            (msg) => {
              if (msg.properties.correlationId == correlationId) {
                console.log(" [.] Got %s", msg.content.toString());
                defineResponse(msg.content.toString(), response);
                connection.close();
              }
            },
            {
              noAck: true,
            }
          );

          channel.sendToQueue("rpc_queue", Buffer.from(body), {
            correlationId: correlationId,
            replyTo: q.queue,
          });
        }
      );
    });
  });
}

function defineResponse(message, response) {
  response.message = message;
}
function generateUuid() {
  return (
    Math.random().toString() +
    Math.random().toString() +
    Math.random().toString()
  );
}
