"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const kafkajs_1 = require("kafkajs");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PRODUCT_SERVICE_URL = 'http://localhost:3003';
let orders = [];
const kafka = new kafkajs_1.Kafka({
    clientId: 'accounting-service',
    brokers: ['localhost:29092']
});
const producer = kafka.producer();
app.post('/order', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, quantity, userId } = req.body;
    try {
        const productResponse = yield axios_1.default.get(`${PRODUCT_SERVICE_URL}/products/${productId}`);
        const product = productResponse.data;
        if (product.stock < quantity) {
            return res.status(400).send('Insufficient stock');
        }
        const order = { id: Date.now(), productId, quantity, userId, status: 'pending' };
        orders.push(order);
        yield producer.connect();
        yield producer.send({
            topic: 'order_created',
            messages: [{ value: JSON.stringify(order) }],
        });
        res.status(201).send(order);
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
}));
app.listen(3003, () => {
    console.log('Order Service listening on port 3003');
});
