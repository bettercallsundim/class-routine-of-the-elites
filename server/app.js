import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { app as userRoute } from "./routes/userRoute.js";
const app = express();

import { myfunc } from "./database.js";
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
const uri = "mongodb+srv://vprime:vprime5@vprime.qleekyr.mongodb.net/CROTE";

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async (res) => {
    console.log("successfully connected to db");
    await myfunc(app);
    app.use("/user", userRoute);
    app.get("/", (req, res) => {
      res.send("Connected to MongoDB Atlas");
    });

    app.listen(4000, () => {
      console.log("Express server listening on port 4000");
    });
  })
  .catch((err) => {
    console.log("error occurred", err);
  });
