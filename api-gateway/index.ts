import express, { Request, Response } from 'express';
import axios from 'axios';

const app = express();
app.use(express.json());

const USER_SERVICE_URL = 'http://localhost:3001';
const POS_SERVICE_URL = 'http://localhost:3002';

app.post('/pos', async (req: Request, res: Response) => {
  try {
    const orderResponse = await axios.post(`${POS_SERVICE_URL}/get-cash-float`, req.body);
    res.status(201).send(orderResponse.data);
  } catch (error:any) {
    res.status(500).send({message: error});
    return;
  }
});

app.listen(3000, () => {
  console.log('API Gateway listening on port 3000');
});
