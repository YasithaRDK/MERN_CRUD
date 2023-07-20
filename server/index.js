import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/EmployerRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongodb Connected..."))
  .catch((err) => console.Console.log(err));

app.use("/api/", routes);

app.all("*", (req, res) => res.send("That route dosen't exist"));

app.listen(PORT, () => console.log(`Listning at ${PORT}`));
