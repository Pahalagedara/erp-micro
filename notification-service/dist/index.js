"use strict";
/**
 * author Thilina Pahalagedara
 * created on 29-05-2024-21h-09m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const kafkajs_1 = require("kafkajs");
const kafka = new kafkajs_1.Kafka({
    clientId: 'notification-service',
    brokers: ['localhost:29092']
});
const consumer = kafka.consumer({ groupId: 'notification-group' });
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    yield consumer.connect();
    yield consumer.subscribe({ topic: 'order_created', fromBeginning: true });
    yield consumer.run({
        eachMessage: (_a) => __awaiter(void 0, [_a], void 0, function* ({ topic, partition, message }) {
            if (!message.value) {
                console.error('Received message with null value');
                return;
            }
            const order = JSON.parse(message.value.toString());
            console.log(`Received order: ${order.id}, Sending notification...`);
            // Simulate sending notification
        }),
    });
});
run().catch(console.error);
