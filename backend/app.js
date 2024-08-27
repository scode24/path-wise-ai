import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { appConfigInit } from "./configuration/app.configuration.js";
import appRouter from "./routes/app.route.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// Define routes
app.use("/pathwise/api", appRouter);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  appConfigInit();
  console.log(`Server is running on port ${PORT}`);
});

export default app;
