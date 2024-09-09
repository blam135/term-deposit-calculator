import express from "express";
import { ServerConfig } from "./config/env";
import { router as v1Router } from "./routes/v1";

const app = express();

app.use(express.json());
app.use("/v1", v1Router);

app.listen(ServerConfig.PORT, () => {
  console.log(`App Started on Port ${ServerConfig.PORT}`);
})

export default app;