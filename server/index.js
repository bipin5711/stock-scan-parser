import express from "express";
import cors from "cors";
import { jsonData } from "./constants.js";

const port = 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/data", (req, res, next) => {
  res.json(jsonData);
});

app.listen(port, () => {
  console.log(`App is listening to Port: ${port}`);
});
