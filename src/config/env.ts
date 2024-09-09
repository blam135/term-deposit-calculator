import dotenv from "dotenv";

dotenv.config();

export const ServerConfig = Object.freeze({
  PORT: Number(process.env.PORT) || 3000
})