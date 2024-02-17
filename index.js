import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from "./routes/user.js";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const app = require("express")();
mongoose.set("strictQuery", false);

// const app = express();
dotenv.config();

const server =require("http").createServer(app);

const connect = () =>{
  mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log("connected to DB"))
}

app.use(cors());
app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))

app.use("/user", userRouter);

app.get('/', (req,res)=>{
  res.send("Running....");
})

const PORT = process.env.PORT || 8082;

server.listen(PORT, () => {
  cors:true
  connect();
  console.log("connnected to PORT:" ,PORT);
  })


// mongoose.set('useFindAndModify', false);
