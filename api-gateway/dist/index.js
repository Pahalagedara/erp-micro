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
const app = (0, express_1.default)();
app.use(express_1.default.json());
const USER_SERVICE_URL = 'http://localhost:3001';
const PRODUCT_SERVICE_URL = 'http://localhost:3002';
const ORDER_SERVICE_URL = 'http://localhost:3003';
app.post('/order', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const orderResponse = yield axios_1.default.post(`${ORDER_SERVICE_URL}/order`, req.body);
        res.status(201).send(orderResponse.data);
    }
    catch (error) {
        res.status(500).send((_a = error.response) === null || _a === void 0 ? void 0 : _a.data);
    }
}));
app.listen(3000, () => {
    console.log('API Gateway listening on port 3000');
});
