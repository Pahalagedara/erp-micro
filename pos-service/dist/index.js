"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
let products = [
    { id: 1, name: 'Product 1', price: 100, stock: 10 },
    { id: 2, name: 'Product 2', price: 200, stock: 20 }
];
app.get('/products', (req, res) => {
    res.send(products);
});
app.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product)
        return res.status(404).send('Product not found');
    res.send(product);
});
app.listen(3002, () => {
    console.log('Product Service listening on port 3002');
});
