import express, { Request, Response } from 'express';
import axios from "axios";

const ACCOUNTING_SERVICE_URL = 'http://localhost:3003';

const app = express();
app.use(express.json());

app.post("/get-cash-float", async(req: Request, res: Response) => {
  try {
    console.log(req)
    const getCashResponse = await axios.post(`${ACCOUNTING_SERVICE_URL}/get-cash`,{
      bodyData: {
        cashFloat: req.body.cashFloat,
        cashierId: "cashier2553"
      }
    });
    if(getCashResponse){
      res.status(200).send(getCashResponse.data);
    }else{
      res.status(404).send({message: "Failed to get cash float"});
    }
  }catch(error: any){
    res.status(500).send({message: error});
    return;
  }
})

app.listen(3002, () => {
  console.log('pos Service listening on port 3002');
});
