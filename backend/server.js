import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import connectToDB from "./database/config.js";
import router from "./routes/UserRoutes.js";

const port = 4000;

const app = express();
app.use(cors());
app.use(express.json());

connectToDB();

app.use("/api/", router);

app.use("/", (req, res) => {
  res.send("API is running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
