import express, { Request, Response } from "express";
import { Kafka, Partitioners } from "kafkajs";

// Use the legacy partitioner to retain previous partitioning behavior
const { LegacyPartitioner } = Partitioners;

const app = express();
app.use(express.json());

const kafka = new Kafka({
  clientId: "accounting-service",
  brokers: ["localhost:9092"],
});

// Create the producer with the legacy partitioner
const producer = kafka.producer({
  createPartitioner: LegacyPartitioner,
});

//type define
interface CashAvailabilityRes {
  transactionalId: number;
  cashAvailability: boolean;
}

app.post("/get-cash", async (req: Request, res: Response) => {
  try {
    if (req.body.cashFloat > 1000) {
      res.send(400).send({ message: "The cash amount is out of balance." });
      return;
    }
    let cashRes: CashAvailabilityRes = {
      transactionalId: 123,
      cashAvailability: true,
    };
    await producer.connect();
    await producer.send({
      topic: "cash_trans_created",
      messages: [{ value: JSON.stringify(cashRes) }],
    });

    res.status(200).send(cashRes);
    return;
  } catch (error: any) {
    console.log(error);
    res.status(500).send({message: error});
    return;
  }
});

app.listen(3003, () => {
  console.log("acc Service listening on port 3003");
});
