/**
 * author Thilina Pahalagedara
 * created on 29-05-2024-21h-09m
 * github: https://github.com/Pahalagedara
 * copyright 2024
 */

import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "notification-service",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "notification-group" });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({
    topic: "cash_trans_created",
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (!message.value) {
        console.error("Received message with null value");
        return;
      }
      const cashRes = message.value.toString();
      console.log("-----------------------------------------------------");
      console.log(`Received message: ${cashRes}, Sending notification...`);
      // Simulate sending notification
    },
  });
};

run().catch(console.error);
