import express from "express";
import { config } from "dotenv";
import DBConnection from "./config/DbConnect.js";
import weatherRoute from "./routes/weather.route.js"
config();
const app = express();
app.use(express.json());
app.use("/api",weatherRoute)
const PORT = process.env.PORT;
app.listen(PORT, async () => {
  await DBConnection();
  console.log("app is listening on ", +PORT);
});
