"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
let users = [];
app.post('/users', (req, res) => {
    const user = Object.assign({ id: Date.now() }, req.body);
    users.push(user);
    res.status(201).send(user);
});
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user)
        return res.status(404).send('User not found');
    res.send(user);
});
app.listen(3001, () => {
    console.log('User Service listening on port 3001');
});
