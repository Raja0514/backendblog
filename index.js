const express = require("express");
const cors=require('cors')
const app = express();
const mongoose = require("mongoose");
const router = require("./Routes/User-Routes");
const router1=require('./Routes/Blog-Routes')
app.use(express.json());
app.use(cors());
app.use("/api/user", router);
app.use("/api/blogs",router1)
app.get('/',(req,res)=>{
  res.send("hello world")
})
const PORT=process.env.PORT||"5000";
mongoose
  .connect(
    "mongodb://root:root@ac-6y9wzjv-shard-00-00.oo6motq.mongodb.net:27017,ac-6y9wzjv-shard-00-01.oo6motq.mongodb.net:27017,ac-6y9wzjv-shard-00-02.oo6motq.mongodb.net:27017/?ssl=true&replicaSet=atlas-khltse-shard-0&authSource=admin&retryWrites=true&w=majority"
  )
  .then(() => app.listen((PORT)))
  .then(() =>
    console.log("connected to database and listening at port no 5000")
  )
  .catch((err) => console.log(err));
