import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());

interface User {
  id: number;
  name: string;
}

let users: User[] = [];

app.post('/users', (req: Request, res: Response) => {
  const user: User = { id: Date.now(), ...req.body };
  users.push(user);
  res.status(201).send(user);
});

app.get('/users/:id', (req: Request, res: Response) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User not found');
  res.send(user);
});

app.listen(3001, () => {
  console.log('User Service listening on port 3001');
});
